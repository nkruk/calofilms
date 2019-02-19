import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility';

const initialState = {
    films: [],
    displayedFilms: [],
    loading: false,
    displayed: false
};

const fetchFilmsStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const fetchFilmsSuccess = ( state, action ) => {

    return updateObject(state, {
        films: [...action.films],
        displayedFilms: [...action.films],
        loading: false,
        displayed: true
    } );
};

const fetchFilmsFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const updateDisplayedFilms = (state, action) => {
    return updateObject( state, {displayedFilms: action.displayedFilms} )
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_FILMS_START: return fetchFilmsStart( state, action );
        case actionTypes.FETCH_FILMS_SUCCESS: return fetchFilmsSuccess( state, action );
        case actionTypes.FETCH_FILMS_FAIL: return fetchFilmsFail( state, action );
        case actionTypes.UPDATE_DISPLAYED_FILMS: return updateDisplayedFilms( state, action );
        default:
            return state;
    }
};

export default reducer;