import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

import classnames from 'classnames';
import axios from 'axios';



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

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }

        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    onChange(e) {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const userData = {
            email: this.state.email,
            password: this.state.password
        };

        this.props.loginUser(userData);
    }

    render() {
        const { errors } = this.state;
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
                                    />
                                    {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                                </div>
                                <MuiThemeProvider theme={theme}>
                                    <Button
                                        variant="contained"
                                        type="submit"
                                        color="secondary"
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

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    return {
        auth: state.auth,
        errors: state.errors
    };
}

export default connect(mapStateToProps, { loginUser })(Login);