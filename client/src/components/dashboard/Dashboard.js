import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import {connect} from 'react-redux';
import {getCurrentProfile} from '../../actions/profileActions';
import Spinner from '../Spinner';

class Dashboard extends Component {
    componentDidMount() {
        this.props.getCurrentProfile();
    }

    render() {
        const {user} = this.props.auth;
        const {profile, loading} = this.props.profile;

        let dashboardContent; 

        if (profile === null || loading) {
            dashboardContent = <h4><Spinner /></h4>
        } else {
            // делаем проверку, имеет ли залогированный пользователь данные профиля
            if (Object.keys(profile).length > 0) {
                dashboardContent = <h4>TODO: DISPLAY PROFILE</h4>
            } else {
                // пользователь залогирован но у него нет профиля
                dashboardContent = (
                    <div>
                        <p className="lead lead--muted">Привет, {user.name}</p>
                        <p>Вы еще не установили профиль, пожалуйста, добавьте какую то информацию</p>
                        <Link to="/create-profile">
                            Создать профиль
                        </Link>
                    </div>
                );
            }
        }

        return (
            <div className="dashboard">
                <div className="dashboard-container">
                    <h1 className="dashboard-title">Dashboard</h1>
                    {dashboardContent}
                </div>
            </div>
        )
    }
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        profile: state.profile,
        auth: state.auth
    }
}

export default connect(mapStateToProps, {getCurrentProfile})(Dashboard);
