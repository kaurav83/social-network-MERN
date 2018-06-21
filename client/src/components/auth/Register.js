import React, { Component } from 'react';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import purple from '@material-ui/core/colors/purple';
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
    console.log(newUser)
  }

  render() {
    const {classes} = this.props;
    return (
      <section className="register">
        <div className="register-container">
          <div className="register-content">
          <h1 className="register-title">Зарегистрироваться</h1>
          <p className="register-lead">Создайте ваш аккаунт</p>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <Input
                type="text"
                className="form-control"
                placeholder="Name"
                name="name"
                value={this.state.name}
                onChange={this.onChange}
                classes={{
                  underline: classes.cssUnderline
                }}
              />
            </div>
            <div className="form-group">
              <Input
                type="email"
                className="form-control"
                placeholder="Email address"
                name="email"
                value={this.state.email}
                onChange={this.onChange}
                classes={{
                  underline: classes.cssUnderline
                }}
              />
            </div>
            <div className="form-group">
              <Input
                type="password"
                className="form-control"
                placeholder="Password"
                name="password"
                value={this.state.password}
                onChange={this.onChange}
                classes={{
                  underline: classes.cssUnderline
                }}
              />
            </div>
            <div className="form-group">
              <Input
                type="password"
                className="form-control"
                placeholder="Confirm password"
                name="password2"
                value={this.state.password2}
                onChange={this.onChange}
                classes={{
                  underline: classes.cssUnderline
                }}
              />
            </div>
            <MuiThemeProvider theme={theme}>
              <Button 
                  variant="contained" 
                  type="submit" 
                  color="primary" 
                  style={{width: "100%", margin: ".5rem 0 0 0"}}
                >Отправить
              </Button>
            </MuiThemeProvider>
          </form>
          </div>
        </div>
      </section>
    )
  }
}

export default withStyles(styles)(Register);