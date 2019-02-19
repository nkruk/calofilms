import axios from 'axios';

import * as actionTypes from './actionTypes';

export const fetchFilmsSuccess = ( fetchedFilms ) => {
    return {
        type: actionTypes.FETCH_FILMS_SUCCESS,
        films: fetchedFilms,
    };
};

export const fetchFilmsFail = ( error ) => {
    return {
        type: actionTypes.FETCH_FILMS_FAIL,
        error: error
    };
};

export const fetchFilmsStart = () => {
    return {
        type: actionTypes.FETCH_FILMS_START
    };
};

export const fetchFilms = () => {
    return dispatch => {
        dispatch(fetchFilmsStart());
            axios.get( 'https://calofilms.firebaseio.com/films.json' )
                .then( response => {
                    const fetchedFilms = Object.values(response.data);
                    dispatch(fetchFilmsSuccess(fetchedFilms));
                } )
                .catch( error => {
                    dispatch(fetchFilmsFail(error));
                } );
        };
    };


export const updateDisplayedFilms = ( filteredArrayOfFilms ) => {
    return {
        type: actionTypes.UPDATE_DISPLAYED_FILMS,
        displayedFilms: filteredArrayOfFilms,
    };
};

export const updateFilms = (filteredArrayOfFilms) => {
    return dispatch => {
        dispatch(updateDisplayedFilms(filteredArrayOfFilms));
    }
};