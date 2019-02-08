import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    filmsInUsersQueue: [],
    loading: false,
};

const addToUserQueueStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};


const addToUserQueueSuccess = ( state, action ) => {
    const newFilmsInUsersQueue = [...state.filmsInUsersQueue];
    newFilmsInUsersQueue.push({
        docID: action.docId,
        film: action.addToQueueData.film
    })
    
    return updateObject( state, {
        loading: false,
        filmsInUsersQueue: newFilmsInUsersQueue
    } );
};

const addToUserQueueFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};


const fetchUserQueueStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const fetchUserQueueSuccess = ( state, action ) => {
    return updateObject( state, {
        filmsInUsersQueue: action.userQueue,
        loading: false
    } );
};

const fetchUserQueueFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};


const removeFromUserQueueStart = (state, action) => {
    return updateObject( state, { loading: true } );
};

const removeFromUserQueueFail = (state, action) => {
    return updateObject( state, { loading: false } );
};


const removeFromUserQueueSuccess = (state, action) => {
    const newFilmsInUsersQueue = [...state.filmsInUsersQueue];
    newFilmsInUsersQueue.splice(newFilmsInUsersQueue.indexOf(action.film), 1)

    return updateObject( state, {
        loading: false,
        filmsInUsersQueue: newFilmsInUsersQueue
    } );
};


const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.ADD_TO_USER_QUEUE_START: return addToUserQueueStart( state, action );
        case actionTypes.ADD_TO_USER_QUEUE_SUCCESS: return addToUserQueueSuccess( state, action )
        case actionTypes.ADD_TO_USER_QUEUE_FAIL: return addToUserQueueFail( state, action );
        case actionTypes.FETCH_USER_QUEUE_START: return fetchUserQueueStart( state, action );
        case actionTypes.FETCH_USER_QUEUE_SUCCESS: return fetchUserQueueSuccess( state, action );
        case actionTypes.FETCH_USER_QUEUE_FAIL: return fetchUserQueueFail( state, action ); 
        case actionTypes.REMOVE_FROM_USER_QUEUE_START: return removeFromUserQueueStart( state, action );
        case actionTypes.REMOVE_FROM_USER_QUEUE_SUCCESS: return removeFromUserQueueSuccess( state, action )
        case actionTypes.REMOVE_FROM_USER_QUEUE_FAIL: return removeFromUserQueueFail( state, action );
        default: return state;
    }
};

export default reducer;