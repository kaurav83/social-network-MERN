import React, { Component } from 'react'

import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import purple from '@material-ui/core/colors/purple';

import classnames from 'classnames';
import axios from 'axios';

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
  
class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        };

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
        
        const user = {
            email: this.state.email,
            password: this.state.password
        };

        axios.post('/api/users/login', user)
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
                            <h1 className="auth-title">Авторизуйтесь</h1>
                                <p className="auth-lead">Войдите в ваш аккаунт</p>
                                <form noValidate onSubmit={this.onSubmit}>
                                    <div className="form-group">
                                        <Input
                                            type="email"
                                            placeholder="Email адрес"
                                            className={classnames('form-control', {
                                                'is-invalid': errors.email
                                            })}
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
                                            placeholder="Пароль"
                                            className={classnames('form-control', {
                                                'is-invalid': errors.password
                                            })}
                                            name="password"
                                            value={this.state.password}
                                            onChange={this.onChange}
                                            classes={{
                                            underline: classes.cssUnderline
                                            }}
                                        />
                                        {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                                    </div>
                                    <MuiThemeProvider theme={theme}>
                                        <Button 
                                            variant="contained" 
                                            type="submit" 
                                            color="secondary" 
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

export default withStyles(styles)(Login);