import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
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
  render() {

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
        </nav>

      </section>
    )
  }
}

export default Header;
