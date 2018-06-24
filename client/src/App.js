import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';

import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import {setCurrentUser} from './actions/authActions';

import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Landing from './components/Layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import './components/Layout/Layout.css';
import './App.css';

// проверяем токен
if (localStorage.jwtToken) {
  // если токен в локальном хранилище существуем,
  // помещаем токен auth в залоголовок auth
  setAuthToken(localStorage.jwtToken);
  // декодируем токен и получаем информацию пользователя
  const decoded = jwt_decode(localStorage.jwtToken);
  // устанавливаем пользователя и аутентификацию (isAuthenticated)
  store.dispatch(setCurrentUser(decoded));
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
