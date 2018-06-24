import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';

import classnames from 'classnames';

import './Register.css';

import TextFieldGroup from '../common/text_field_group';

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
      main: '#76FF03',
      dark: '#64DD17',
      contrastText: '#000',
    },
  },
});

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      password: '',
      password2: '',
      email: '',
      errors: {}
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  render() {
    const { errors } = this.state;

    return (
      <section className="auth">
        <div className="auth-container">
          <div className="auth-content">
            <div className="auth-inner">
              <h1 className="auth-title">Зарегистрироваться</h1>
              <p className="auth-lead">Создайте ваш аккаунт</p>
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Имя"
                  name="name"
                  type="text"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                />
                <TextFieldGroup
                  placeholder="Email"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                  info="Этот сайт использует Gravatar, поэтому, если вам нужно изображения профиля, используйте email Gravatar"
                />
                <TextFieldGroup
                  placeholder="Пароль"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password}
                />
                <TextFieldGroup
                  placeholder="Подтвердите пароль"
                  name="password2"
                  type="password"
                  value={this.state.password2}
                  onChange={this.onChange}
                  error={errors.password2}
                />
                <MuiThemeProvider theme={theme}>
                  <Button
                    variant="contained"
                    type="submit"
                    color="primary"
                    style={{ width: "100%", margin: "2rem 0 0 0", borderRadius: "0" }}
                  >Отправить
                  </Button>
                </MuiThemeProvider>
              </form>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    errors: state.errors
  };
};

export default connect(mapStateToProps, { registerUser })(withRouter(Register));