import axios from 'axios';
import {GET_PROFILE, 
        PROFILE_LOADING, 
        GET_ERRORS, 
        CLEAR_CURRENT_PROFILE
    } from './types';

// получаем текущий профиль
export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());

    axios.get('/api/profile')
        .then(res => 
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        )
        .catch(err => 
            dispatch({
                type: GET_PROFILE,
                payload: {}
            })
        );
};

// загрузка профиля
export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    };
};

// отчистка профиля
export const clearCurrentProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    };
};