import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import ProfileHeader from './ProfileHeader';
import ProfileAbout  from './ProfileAbout';
import ProfileCreds from './ProfileCreds';
import ProfileGithub from './ProfileGithub';
import Spinner from '../Spinner';
import {getProfileByHandle} from '../../actions/profileActions';

class Profile extends Component {
    componentDidMount() {
        if (this.props.match.params.handle) {
            this.props.getProfileByHandle(this.props.match.params.handle);
        }
    }
    render() {
        const {profile, loading} = this.props.profile;
        let profileContent;

        if (profile === null || loading) {
            profileContent = <Spinner />
        } else {
            profileContent = (
                <div>
                    <div className="profile-content">
                        <Link to="/profiles" className="BUTTON">
                            Назад к профилям
                        </Link>
                    </div>
                    <ProfileHeader profile={profile} />
                    <ProfileAbout  profile={profile} />
                    <ProfileCreds />
                    <ProfileGithub />
                </div>
            )
        }
        
        return (
            <div className="profile">
                <div className="profile-container">
                    {profileContent}
                </div>
            </div>
        )
    }
}

Profile.propTypes = {
    profile: PropTypes.object.isRequired,
    getProfileByHandle: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        profile: state.profile
    };
}

export default  connect(mapStateToProps, {getProfileByHandle})(Profile);