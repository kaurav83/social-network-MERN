import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './Landing.css';
import Button from '@material-ui/core/Button';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

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


class Landing extends Component {
    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }

    render() {
        return (
            <section className="landing">
                <div className="landing-container">
                    <div className="landing-content">
                        <h1 className="landing-title">
                            Социальная сеть для разработчиков
                        </h1>
                        <p className="landing-description">
                            Создайте профиль/портфолио разработчика, чтобы делиться постами и получать помощь от других разработчиков
                        </p>
                        {/* <a href="#" className="button sign-up">Зарегистрироваться</a> */}
                        <MuiThemeProvider theme={theme}>
                            <Button
                                variant="contained"
                                color="primary"
                                className="landing-button"
                            >
                                <Link to="/register">
                                    Зарегистрироваться
                                </Link>
                            </Button>
                        </MuiThemeProvider>
                        <MuiThemeProvider theme={theme}>
                            <Button
                                variant="contained"
                                color="secondary"
                                className="landing-button"
                            >
                                <Link to="/login">
                                    Авторизоваться
                                </Link>
                            </Button>
                        </MuiThemeProvider>
                    </div>

                </div>

            </section>
        )
    }
}

Landing.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    };
};

export default connect(mapStateToProps)(Landing);