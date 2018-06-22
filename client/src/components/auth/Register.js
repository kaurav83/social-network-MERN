import React, { Component } from 'react';

import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import purple from '@material-ui/core/colors/purple';

import axios from 'axios';

import classnames from 'classnames';

import './Register.css';

const styles = theme => ({
  cssUnderline: {
    '&:after': {
      borderBottomColor: purple[500]
    }
  }
});

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
    }

    axios.post('/api/users/register', newUser)
      .then(result => console.log(result.data))
      .catch(err => this.setState({errors: err.response.data}))
  }

  render() {
    const {classes} = this.props;
    const {errors} = this.state;
    
    return (
      <section className="auth">
        <div className="auth-container">
          <div className="auth-content">
            <div className="auth-inner">
              <h1 className="auth-title">Зарегистрироваться</h1>
              <p className="auth-lead">Создайте ваш аккаунт</p>
              <form noValidate onSubmit={this.onSubmit}>
                <div className="form-group">
                  <Input
                    type="text"
                    className={classnames('form-control', {
                      'is-invalid': errors.name
                    })}
                    placeholder="Имя"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                    classes={{
                      underline: classes.cssUnderline
                    }}
                  />
                  {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
                </div>
                <div className="form-group">
                  <Input
                    type="email"
                    className={classnames('form-control', {
                      'is-invalid': errors.email
                    })}
                    placeholder="Email адрес"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    classes={{
                      underline: classes.cssUnderline
                    }}
                  />
                  {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                </div>
                <div className="form-group">
                  <Input
                    type="password"
                    className={classnames('form-control', {
                      'is-invalid': errors.password
                    })}
                    placeholder="Пароль"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    classes={{
                      underline: classes.cssUnderline
                    }}
                  />
                  {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                </div>
                <div className="form-group">
                  <Input
                    type="password"
                    className={classnames('form-control', {
                      'is-invalid': errors.password2
                    })}
                    placeholder="Подтвердите пароль"
                    name="password2"
                    value={this.state.password2}
                    onChange={this.onChange}
                    classes={{
                      underline: classes.cssUnderline
                    }}
                    id="name-error"
                  />
                  {errors.password2 && (<div className="invalid-feedback">{errors.password2}</div>)}
                </div>
                <MuiThemeProvider theme={theme}>
                  <Button 
                      variant="contained" 
                      type="submit" 
                      color="primary" 
                      style={{width: "100%", margin: "2rem 0 0 0", borderRadius: "0"}}
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

export default withStyles(styles)(Register);