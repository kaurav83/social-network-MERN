import axios from 'axios';

const setAuthToken = token => {
    if (token) {
        // если token существует применить для каждого запроса
        axios.defaults.headers.common['Authorization'] = token;
        console.log(axios.defaults.headers.common);
    } else {
        // иначе удаляем заголовок авторизации
        delete axios.defaults.headers.common['Authorization'];
    }
};

export default setAuthToken;