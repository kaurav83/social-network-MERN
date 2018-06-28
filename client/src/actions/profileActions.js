import axios from 'axios';
import {GET_PROFILE, 
        PROFILE_LOADING, 
        CLEAR_CURRENT_PROFILE,
        GET_ERRORS,
        SET_CURRENT_USER
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

// создание профиля
export const createProfile = (profileData, history) => dispatch => {
    axios.post('/api/profile', profileData)
        .then(res => history.push("/dashboard"))
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// добавляем опыт
export const addExperience = (expData, history) => dispatch => {
    axios.post('/api/profile/experience', expData)
        .then(res => history.push('/dashboard'))
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}

// удалить аккаунт и профиль
export const deleteAccount = () => dispatch => {
    if (window.confirm('Вы уверены? Этот аккаунт будет аннулирован')) {
        axios.delete('/api/profile')
            .then(res => 
                dispatch({
                    type: SET_CURRENT_USER,
                    payload: {}
                })
            )
            .catch(err => 
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
            )
    }
}

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