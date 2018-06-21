import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom';
import './Header.css';

class Header extends Component {
  render() {
    return (
      <section className="header">
        <nav className="navbar">
          <div className="nav-logo-container">
            <Link to="/" className="navbar-logo">DevSocial</Link>
          </div>
          <ul className="navbar-list">
            <li className="navbar-list__item">
              <NavLink
                to="/profiles"
                className="navbar-list__link"
                activeClassName="selected"
              >
                Разработчики
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-list">
            <li className="navbar-list__item">
              <NavLink
                to="/register"
                className="navbar-list__link sign-up"
                activeClassName="selected"
              >
                Зарегистрироваться
              </NavLink>
            </li>
            <li className="navbar-list__item">
              <NavLink
                to="/login"
                className="navbar-list__link sign-in"
                activeClassName="selected"
              >
                Войти
              </NavLink>
            </li>
          </ul>
        </nav>

      </section>
    )
  }
}

export default Header;
