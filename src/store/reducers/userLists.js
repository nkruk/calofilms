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
    const newfilmsInUsersQueue = [...state.filmsInUsersQueue];
    newfilmsInUsersQueue.push(action.addToQueueData.film)
    
    return updateObject( state, {
        loading: false,
        filmsInUsersQueue: newfilmsInUsersQueue
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

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.ADD_TO_USER_QUEUE_START: return addToUserQueueStart( state, action );
        case actionTypes.ADD_TO_USER_QUEUE_SUCCESS: return addToUserQueueSuccess( state, action )
        case actionTypes.ADD_TO_USER_QUEUE_FAIL: return addToUserQueueFail( state, action );
        case actionTypes.FETCH_USER_QUEUE_START: return fetchUserQueueStart( state, action );
        case actionTypes.FETCH_USER_QUEUE_SUCCESS: return fetchUserQueueSuccess( state, action );
        case actionTypes.FETCH_USER_QUEUE_FAIL: return fetchUserQueueFail( state, action ); 
        default: return state;
    }
};

export default reducer;