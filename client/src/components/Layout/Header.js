import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
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

    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const authLinks = (
      <ul className="navbar-list">
        <li className="navbar-list__item sign-in">
          <MuiThemeProvider theme={theme}>
            <Button
              className="navbar-list__button"
              color="secondary"
              variant="text"
            >
              <a href="#"
                style={{ textTransform: "capitalize", fontSize: "1.2rem", display: 'flex', alignItems: 'center' }}
                className="navbar-list__link"
                // activeClassName="selected"
                onClick={this.onLogoutClick.bind(this)}
              >
                <Avatar 
                  src={user.avatar} 
                  alt={user.name} 
                  title="У вас должен быть подключен Gravatar к вашему email для отображения изображения" 
                  style={{width: "2rem", height: "2rem", marginRight: ".3125rem"}}
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
          <MuiThemeProvider theme={theme}>
            <Button
              className="navbar-list__button"
              color="secondary"
              variant="text"
            >
              <NavLink to="/register"
                style={{ textTransform: "capitalize", fontSize: "1.2rem" }}
                className="navbar-list__link"
                activeClassName="selected"
              >
                Зарегистрироваться
                  </NavLink>
            </Button>
          </MuiThemeProvider>
        </li>
        <li className="navbar-list__item sign-in">
          <MuiThemeProvider theme={theme}>
            <Button
              className="navbar-list__button"
              color="secondary"
              variant="text"
            >
              <NavLink to="/login"
                style={{ textTransform: "capitalize", fontSize: "1.2rem" }}
                className="navbar-list__link"
                activeClassName="selected"
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
              <MuiThemeProvider theme={theme}>
                <Button
                  color="secondary"
                  className="navbar-list__button"
                  variant="text"
                  style={{ textTransform: "capitalize", fontSize: "1.2rem" }}
                >
                  <NavLink to="/profiles"
                    style={{ textTransform: "capitalize", fontSize: "1.2rem" }}
                    className="navbar-list__link"
                    activeClassName="selected"
                  >
                    Разработчики
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

export default connect(mapStateToProps, { logoutUser })(Header);
