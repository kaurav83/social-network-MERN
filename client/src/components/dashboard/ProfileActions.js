import React from 'react';
import {Link} from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import './Dashboard.css';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#fff9c4',
            main: '#ffeb3b',
            dark: '#f57f17',
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

const ProfileActions = () => {
    return (
        <div className="links-group">
            <MuiThemeProvider theme={theme}>
                <Button
                    className="links-group__button"
                    color="primary"
                    variant="text"
                >
                    <i className="fas fa-user-circle dashboard-icons"></i>
                    <Link
                        to="/edit-profile"
                        className="links-group__link"
                    >
                        Редактировать профиль
                    </Link>
                </Button>
            </MuiThemeProvider>
            <MuiThemeProvider theme={theme}>
                <Button
                    className="links-group__button"
                    color="primary"
                    variant="text"
                >
                    <i className="fab fa-black-tie dashboard-icons"></i>
                    <Link
                        to="/add-experience"
                        className="links-group__link"
                    >
                        Добавить опыт
                    </Link>
                </Button>
            </MuiThemeProvider>
            <MuiThemeProvider theme={theme}>
                <Button
                    className="links-group__button"
                    color="primary"
                    variant="text"
                >
                    <i className="fas fa-graduation-cap dashboard-icons"></i>
                    <Link
                        to="/add-education"
                        className="links-group__link"
                    >
                        Добавить образование
                    </Link>
                </Button>
            </MuiThemeProvider>
        </div>
    );
};

export default ProfileActions;