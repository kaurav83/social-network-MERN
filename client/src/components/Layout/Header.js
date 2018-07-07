import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileActions';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import DeveloperBoard from '@material-ui/icons/DeveloperBoard';
import NoteAdd from '@material-ui/icons/NoteAdd';
import Launch from '@material-ui/icons/Launch';
import Person from '@material-ui/icons/Person';
import Group from '@material-ui/icons/Group';
import PersonAdd from '@material-ui/icons/PersonAdd';
import './Header.css';
import logo from '../../img/SocialNetwordForDevelopers.png'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#fff9c4',
      main: '#ffeb3b',
      dark: '#ffc107',
      contrastText: '#000',
    },
    secondary: {
      light: '#CCFF90',
      main: '#fff',
      dark: '#64DD17',
      contrastText: '#000',
    },
  },
});

class Header extends Component {
  onLogoutClick(e) {
    e.preventDefault();

    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const authLinks = (
      <ul className="navbar-list authLinks">
        <li className="navbar-list__item notes">
          <span className="mobile-variant">
            <Link to="/feed" style={{ display: "block" }}>
              <NoteAdd style={{ fontSize: "40", color: "#fff" }} />
            </Link>
          </span>
          <MuiThemeProvider theme={theme}>
            <Button
              className="navbar-list__button"
              color="secondary"
              variant="text"
            >
              <NavLink to="/feed"
                style={{ textTransform: "capitalize", fontSize: "1.2rem" }}
                className="navbar-list__link"
              // activeClassName="selected-item"
              // activeStyle={{
              //     color: "yellow",
              //     textDecoration: "underline"
              // }}
              >
                Записи
              </NavLink>
            </Button>
          </MuiThemeProvider>
        </li>
        <li className="navbar-list__item  sign-up">
          <span className="mobile-variant">
            <Link to="/dashboard" style={{ display: "block" }}>
              <DeveloperBoard style={{ fontSize: "40", color: "#fff" }} />
            </Link>
          </span>
          <MuiThemeProvider theme={theme}>
            <Button
              className="navbar-list__button"
              color="secondary"
              variant="text"
            >
              <NavLink to="/dashboard"
                style={{ textTransform: "capitalize", fontSize: "1.2rem" }}
                className="navbar-list__link"
              // activeClassName="selected-item"
              // activeStyle={{
              //     color: "yellow",
              //     textDecoration: "underline"
              // }}
              >
                Панель управления
              </NavLink>
            </Button>
          </MuiThemeProvider>
        </li>
        <li className="navbar-list__item sign-in">
          <span className="mobile-variant">
            <a href=""
              className="navbar-list__button"
              // activeClassName="selected"
              onClick={this.onLogoutClick.bind(this)}
            >
              <Launch style={{ fontSize: "40", color: "#fff" }} />
            </a>
          </span>
          <MuiThemeProvider theme={theme}>
            <Button
              className="navbar-list__button"
              color="secondary"
              variant="text"
            >
              <a href=""
                style={{ textTransform: "capitalize", fontSize: "1.2rem", display: 'flex', alignItems: 'center' }}
                className="navbar-list__link"
                // activeClassName="selected"
                onClick={this.onLogoutClick.bind(this)}
              >
                <Avatar
                  src={user.avatar}
                  alt={user.name}
                  title="У вас должен быть подключен Gravatar к вашему email для отображения изображения"
                  style={{ width: "2rem", height: "2rem", marginRight: ".3125rem" }}
                />{' '}
                Выйти
                </a>
            </Button>
          </MuiThemeProvider>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-list">
        <li className="navbar-list__item  sign-up">
          <span className="mobile-variant">
            <Link to="/register" style={{ display: "block" }}>
              <PersonAdd style={{ fontSize: "40", color: "#fff" }} />
            </Link>
          </span>
          <MuiThemeProvider theme={theme}>
            <Button
              className="navbar-list__button"
              color="secondary"
              variant="text"
            >
              <NavLink to="/register"
                style={{ textTransform: "capitalize", fontSize: "1.2rem" }}
                className="navbar-list__link"
              // activeClassName="selected-item"
              // activeStyle={{
              //   color: "yellow",
              //   textDecoration: "underline"
              // }}
              >
                Зарегистрироваться
              </NavLink>
            </Button>
          </MuiThemeProvider>
        </li>
        <li className="navbar-list__item sign-in">
          <span className="mobile-variant">
            <Link to="/login" style={{ display: "block" }}>
              <Person style={{ fontSize: "40", color: "#fff" }} />
            </Link>
          </span>
          <MuiThemeProvider theme={theme}>
            <Button
              className="navbar-list__button"
              color="secondary"
              variant="text"
            >
              <NavLink to="/login"
                style={{ textTransform: "capitalize", fontSize: "1.2rem" }}
                className="navbar-list__link"
              // activeClassName="selected-item"
              // activeStyle={{
              //   color: "yellow",
              //   textDecoration: "underline"
              // }}
              >
                Авторизоваться
                  </NavLink>
            </Button>
          </MuiThemeProvider>
        </li>
      </ul>
    );


    return (
      <section className="header">
        <nav className="navbar">
          <div className="nav-logo-container">
            <Link to="/" className="navbar-logo">
              <img src={logo} alt="logo" className="navbar-logo-image" />
              <span className="navbar-logo-text">DevSocial</span>
            </Link>
          </div>
          <ul className="navbar-list">
            <li className="navbar-list__item">
              <span className="mobile-variant">
                <Link to="/profiles" style={{ display: "block" }}>
                  <Group style={{ fontSize: "40", color: "#fff" }} />
                </Link>
              </span>
              <MuiThemeProvider theme={theme}>
                <Button
                  color="secondary"
                  className="navbar-list__button"
                  variant="text"

                >
                  <NavLink to="/profiles"
                    style={{ textTransform: "capitalize", fontSize: "1.2rem" }}
                    className="navbar-list__link"
                  // activeClassName="selected-item"
                  // activeStyle={{
                  //   color: "yellow",
                  //   textDecoration: "underline"
                  // }}
                  >
                    Сеть
                  </NavLink>
                </Button>
              </MuiThemeProvider>
            </li>
          </ul>

          {isAuthenticated ? authLinks : guestLinks}

        </nav>

      </section>
    )
  }
}

Header.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(Header);
