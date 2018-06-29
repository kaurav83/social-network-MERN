import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import {Provider} from 'react-redux';
import store from './store';

import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import {setCurrentUser, logoutUser} from './actions/authActions';
import {clearCurrentProfile} from './actions/profileActions';

import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Landing from './components/Layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import './components/Layout/Layout.css';
import './App.css';

import PrivateRoute from './components/common/private_route';
import CreateProfile from './components/CreateProfile';
import EditProfile from './components/EditProfile';
import AddExperience from './components/AddCredentials/AddExperience';
import AddEducation from './components/AddCredentials/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';

// проверяем токен
if (localStorage.jwtToken) {
  // если токен в локальном хранилище существуем,
  // помещаем токен auth в залоголовок auth
  setAuthToken(localStorage.jwtToken);
  // декодируем токен и получаем информацию пользователя
  const decoded = jwt_decode(localStorage.jwtToken);
  // устанавливаем пользователя и аутентификацию (isAuthenticated)
  store.dispatch(setCurrentUser(decoded));

  // проверка на "срок годности" токена
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // logout пользователя 
    store.dispatch(logoutUser());
    // Очистка текущего профиля
    store.dispatch(clearCurrentProfile());
    // Перенаправление на login
    window.location.href = '/login';
  }
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
            <Route exact path="/profiles" component={Profiles} />
            <Route exact path="/profile/:handle" component={Profile} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/create-profile" component={CreateProfile} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/edit-profile" component={EditProfile} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/add-experience" component={AddExperience} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/add-education" component={AddEducation} />
            </Switch>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
