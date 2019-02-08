import * as actionTypes from './actionTypes';
import axios from 'axios';

export const addToUserQueueSuccess = ( addToQueueData ) => {
    return {
        type: actionTypes.ADD_TO_USER_QUEUE_SUCCESS,
        addToQueueData: addToQueueData
    };
};

export const addToUserQueueFail = ( error ) => {
    return {
        type: actionTypes.ADD_TO_USER_QUEUE_FAIL,
        error: error
    };
}

export const addToUserQueueStart = () => {
    return {
        type: actionTypes.ADD_TO_USER_QUEUE_START
    };
};

export const addToUserQueue = ( addToQueueData, token ) => {
    return dispatch => {
        dispatch( addToUserQueueStart() );
        axios.post( 'https://calofilms.firebaseio.com/user-lists.json?auth=' + token, addToQueueData )
            .then( response => {
                dispatch( addToUserQueueSuccess( addToQueueData ) );
            } )
            .catch( error => {
                dispatch( addToUserQueueFail( error ) );
            } );
    };
};


export const fetchUserQueueSuccess = ( userQueue ) => {
    return {
        type: actionTypes.FETCH_USER_QUEUE_SUCCESS,
        userQueue: userQueue
    };
};

export const fetchUserQueueFail = ( error ) => {
    return {
        type: actionTypes.FETCH_USER_QUEUE_FAIL,
        error: error
    };
};

export const fetchUserQueueStart = () => {
    return {
        type: actionTypes.FETCH_USER_QUEUE_START
    };
};

export const fetchUsersQueue = (token, userId) => {
    return dispatch => {
        dispatch(fetchUserQueueStart());
        const url = `https://calofilms.firebaseio.com/user-lists.json?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
        axios.get(url)
            .then( res => {
                const fetchedUserQueue = Object.values(res.data).map((element) => {
                    return element.film
                })
                console.log(fetchedUserQueue);
                dispatch(fetchUserQueueSuccess(fetchedUserQueue));
            } )
            .catch( err => {
                dispatch(fetchUserQueueFail(err));
            } );
    };
};


export const removeFromUserQueueSuccess = ( removeFromQueueData ) => {
    return {
        type: actionTypes.REMOVE_FROM_USER_QUEUE_SUCCESS,
        removeFromQueueData: removeFromQueueData
    };
};

export const removeFromUserQueueFail = ( error ) => {
    return {
        type: actionTypes.REMOVE_FROM_USER_QUEUE_FAIL,
        error: error
    };
}

export const removeFromUserQueueStart = () => {
    return {
        type: actionTypes.REMOVE_FROM_USER_QUEUE_START
    };
};

export const removeFromUserQueue = ( removeFromQueueData, token ) => {
    return dispatch => {
        dispatch( removeFromUserQueueStart() );
        axios.post( `https://calofilms.firebaseio.com/user-lists.json?auth=${token}&orderBy="userId"&equalTo="${removeFromQueueData.userId}"` )
            .then( response => {
                console.log(response);
                dispatch( removeFromUserQueueSuccess( removeFromQueueData ) );
            } )
            .catch( error => {
                dispatch( removeFromUserQueueFail( error ) );
            } );
    };
};
 