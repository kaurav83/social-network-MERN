import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../Spinner';
import {getProfiles} from '../../actions/profileActions';
import ProfileItem from './ProfileItem';

class Profiles extends Component {
    componentDidMount() {
        this.props.getProfiles();
    }

    render() {
        const {profiles, loading} = this.props.profile;
        let profileItems;

        if (profiles === null || loading) {
            profileItems = <h4 className="spinner"><Spinner /></h4>; 
        } else {
            if (profiles.length > 0) {
                profileItems = profiles.map(profile => (
                    <ProfileItem key={profile._id} profile={profile} />
                ))
            } else {
                profileItems = <h4>Профили не найдены</h4>
            }
        }

        return (
            <div className="profiles">
                <div className="profiles-container">
                    <div className="profiles-content">
                        <h1 className="text-center">Профили разработчиков</h1>
                        <p className="profiles-lead text-center">
                            Просмотреть и связаться с разработчиками
                        </p>
                        {profileItems}
                    </div>
                </div>
            </div>
        )
    }
}

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => {
    return {
        profile: state.profile
    };
}

export default connect(mapStateToProps, {getProfiles})(Profiles);