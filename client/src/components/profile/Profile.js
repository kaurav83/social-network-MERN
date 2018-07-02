import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileCreds from './ProfileCreds';
import ProfileGithub from './ProfileGithub';
import Spinner from '../Spinner';
import { getProfileByHandle } from '../../actions/profileActions';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import './Profile.css';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#fff9c4',
            main: '#ffeb3b',
            dark: '#ffc107',
            contrastText: '#000',
        },
        secondary: {
            light: '#64B5F6',
            main: '#2196F3',
            dark: '#1976D2',
            contrastText: '#ffffff',
        },
    },
});

class Profile extends Component {
    componentDidMount() {
        if (this.props.match.params.handle) {
            this.props.getProfileByHandle(this.props.match.params.handle);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.profile.profile === null && this.props.profile.loading) {
            this.props.history.push('/not-found');
        }
    }

    render() {
        const { profile, loading } = this.props.profile;
        let profileContent;
        let profileLinkBack;
        let profileContent2;

        if (profile === null || loading) {
            // profileContent
            profileLinkBack = <h4 className="spinner"><Spinner /></h4>; 
        } else {
            profileContent = (
                <div>
                    <ProfileAbout profile={profile} />
                    <ProfileCreds
                        education={profile.education}
                        experience={profile.experience}
                    />
                    {

                        profile.githubusername ?
                            (
                                <ProfileGithub username={profile.githubusername} />
                            )
                            :
                            null
                    }

                </div>
            )

            profileContent2 = (
                <div>
                    <ProfileHeader profile={profile} />
                </div>
            )

            profileLinkBack = (
                <div className="profile-link-back">
                    <MuiThemeProvider theme={theme}>
                        <Button
                            color="primary"
                            variant="contained"
                            style={{ textTransform: 'capitalize', padding: "0", minHeight: "0" }}
                            className="go-back"
                        >
                            <Link
                                to="/profiles"
                                style={{ display: "inline-block", padding: "8px 16px", color: "#000", }}
                                className="button-info"
                            >
                                Назад к профилям
                                </Link>
                        </Button>
                    </MuiThemeProvider>
                </div>
            )
        }

        return (
            <div className="profile">
                {profileLinkBack}
                <div className="profile-container profile-container2">
                    {profileContent2}
                </div>
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

export default connect(mapStateToProps, { getProfileByHandle })(Profile);