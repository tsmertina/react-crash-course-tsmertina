import axios from 'axios';

export const requestLoading = () => ({
    type: 'PERSON_REQUEST_START'
});

export const requestSuccess = (res) =>({
    type: 'PERSON_REQUEST_SUCCESS',
    payload: {
        title: res.name.title,
        name: res.name.first,
        lastName: res.name.last,
        id: res.login.uuid
    }
});

export const requestCancalled = () =>({
    type: 'PERSON_REQUEST_CANCELLED',
});

export const requestError = (err) =>({
    type: 'PERSON_REQUEST_ERROR',
    payload: { error: err}
});

export const colorChange = (color) =>({
    type: 'THEME_CHANGED',
    payload: {
        color: color
    }
});


export const fetchPerson = (repo, currentSource) => (dispatch) => {
    dispatch(requestLoading());
    axios.get(repo,
            { cancelToken: currentSource.token},
        ).then((response) => {
            let res = response.data.results[0];
            dispatch(requestSuccess(res));
        }).catch(error => {
            if (axios.isCancel(error)) {
                dispatch(requestCancalled());
            } else {
                dispatch(requestError(error.message));
            }
         });
}

export const cancelFetch = (currentSource) => (dispatch) => {
    currentSource.cancel();
}

export const namesReducer = (state = namesState, action) => {
    switch (action.type) {
        case 'PERSON_REQUEST_START': {
            return {
                ...state,
                processing: true,
                error: false,
            }
        }

        case 'PERSON_REQUEST_SUCCESS': {
            return {
                ...state,
                response: state.response.concat(action.payload),
                processing: false,
            }
        }

        case 'PERSON_REQUEST_CANCELLED': {
            return {
                ...state,
                error: 'Request cancelled',
                processing: false
            }
        }

        case 'PERSON_REQUEST_ERROR': {
            return {
                ...state,
                error: action.payload,
                processing: false
            }
        }

        case 'THEME_CHANGED': {
            return {
                ...state,
                color: action.payload.color
            }
        }

        default: return state;
    }
}

export const namesState = {
    response: [],
    processing: false,
    error: '',
    color: 'white'
}