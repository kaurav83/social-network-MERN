import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import {GET_ERRORS, SET_CURRENT_USER} from './types';

// register user
export const registerUser = (userData, history) => dispatch => {
    axios.post('/api/users/register', userData)
      .then(result => history.push('/login'))
      .catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      }));
};

// login - получаем токен пользователя
export const loginUser = userData => dispatch => {
    axios.post('/api/users/login', userData)
        .then(res => {
            // сохраняем в localStorage
            const {token} = res.data;
            // устанавливаем токен в localStorage
            localStorage.setItem('jwtToken', token);
            // устанавливаем токен в заголовок авторизации
            setAuthToken(token);
            // расшифровываем токен с помощью установленного модуля jwt-decode, 
            // чтобы получить данные пользователя
            const decoded = jwt_decode(token);
            // устанавливаем текущего пользователя
            dispatch(setCurrentUser(decoded));
        })
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

//набор вошедшего в систему пользователя
export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};

// logout пользователя
export const logoutUser = () => dispatch => {
    // удаление токена из localStorage
    localStorage.removeItem('jwtToken');
    // удаление заголовка аунтификации (auth) для будущих запросов
    setAuthToken(false); // если в ф-и setAuthToken отработает else условие, где происходит удаление 'Authorization'
    // установка текущего пользователя в пустой объект {}, который установит isAuthenticated в false
    dispatch(setCurrentUser({}));
}