import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';
import Spinner from '../Spinner';

import ProfileActions from './ProfileActions';
import Experience from './Experience';
import Education from './Education';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#FFCDD2',
            main: '#F44336',
            dark: '#FF1744',
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

class Dashboard extends Component {
    componentDidMount() {
        this.props.getCurrentProfile();
    }

    onDeleteClick(e) {
        this.props.deleteAccount();
    }

    render() {
        const { user } = this.props.auth;
        const { profile, loading } = this.props.profile;

        let dashboardContent;
        if (profile === null || loading) {
            dashboardContent = <h4 className="spinner"><Spinner /></h4>
        } else {
            // делаем проверку, имеет ли залогированный пользователь данные профиля
            if (Object.keys(profile).length > 0) {
                dashboardContent = (
                    <div className="dashboard-container">
                        <h1 className="dashboard-title">Панель управления</h1>
                        <p className="lead lead--muted">
                            Привет, <Link to={`/profile/${profile.handle}`} className="lead__link">{user.name}</Link>
                        </p>
                        <ProfileActions />
                        <Experience experience={profile.experience} />
                        <Education education={profile.education} />
                        <div style={{ marginTop: "2rem" }}>
                            <MuiThemeProvider theme={theme}>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    style={{textTransform: 'capitalize', color: "#fff"}}
                                    onClick={this.onDeleteClick.bind(this)}
                                >
                                    Удалить мой аккаунт
                                </Button>
                            </MuiThemeProvider>
                        </div>
                    </div>
                );
            } else {
                // пользователь залогирован но у него нет профиля
                dashboardContent = (
                    <div className="dashboard-non-profile">
                        <div className="dashboard-container-non-profile">
                            <h1 className="dashboard-title-non-profile">Панель управления</h1>
                            <p className="lead lead--muted">Привет, <span>{user.name}</span></p>
                            <p style={{marginTop: "1rem"}}>Вы еще не оформили профиль, пожалуйста, добавьте какую-то информацию</p>
                            <MuiThemeProvider theme={theme}>
                                <Button
                                    color="secondary"
                                    variant="contained"
                                    style={{textTransform: 'capitalize', color: "#fff", marginTop: "2rem", padding: "0", minHeight: "0"}}
                                >
                                    <Link to="/create-profile" style={{display: "inline-block", padding: "8px 16px"}}>
                                         Создать профиль
                                    </Link>
                                </Button>
                            </MuiThemeProvider>
                        </div>
                    </div>
                );
            }
        }

        return (
            <div className="dashboard">
                {dashboardContent}
            </div>
        )
    }
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        profile: state.profile,
        auth: state.auth
    }
}

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);
