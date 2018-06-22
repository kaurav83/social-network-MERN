import React, { Component } from 'react';
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
                                href="/register"
                                color="primary"
                                style={{ margin: "1rem .5rem" }}
                            >
                                Зарегистрироваться
                            </Button>
                        </MuiThemeProvider>
                        <MuiThemeProvider theme={theme}>
                            {/* <a href="#" className="button sign-in">Войти</a> */}
                            <Button
                                variant="contained"
                                href="/login"
                                color="secondary"
                                style={{ margin: "1rem .5rem" }}
                            >
                                Авторизоваться
                            </Button>
                        </MuiThemeProvider>
                    </div>

                </div>

            </section>
        )
    }
}

export default Landing;