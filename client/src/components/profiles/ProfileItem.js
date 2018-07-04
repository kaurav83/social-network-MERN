import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import isEmpty from '../../validation/is_empty';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import ImageAvatars from '../common/Avatar';

import './Profiles.css';

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

class ProfileItem extends Component {
    render() {
        const { profile } = this.props;

        return (
            <div className="profile-item">
                <div className="profile-card">
                    <div className="image-avatar">
                        <ImageAvatars profile={profile} />
                    </div>
                    <div className="profile-data">
                        <h3 className="profile-data__name">{profile.user.name}</h3>
                        <p className="profile-data__company">
                            {profile.status} {isEmpty(profile.company) ? null : <span>at {profile.company}</span>}
                        </p>
                        <p className="profile-data__location">
                            {isEmpty(profile.location) ? null : (<span>{profile.location}</span>)}
                        </p>
                    </div>
                    <div className="share-block">
                        <div className="skills-set">
                            <h4 className="skills-set__title">Навыки</h4>
                            <ul className="list-group">
                                {profile.skills.slice(0, 4).map((item, index) => (
                                    <li key={index} className="list-group-item">
                                        <i className="fa fa-check pr-1">
                                            <span> {item}</span>
                                        </i>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="button-link-ingroup">
                            <MuiThemeProvider theme={theme}>
                                <Button
                                    color="secondary"
                                    variant="contained"
                                    style={{ textTransform: 'capitalize', padding: "0", minHeight: "0" }}
                                    className="go-back"
                                >
                                    <Link
                                        to={`/profile/${profile.handle}`}
                                        style={{ display: "inline-block", padding: "8px 16px", color: "#fff", }}
                                        className="button-info"
                                    >
                                        Посмотреть профиль
                                </Link>
                                </Button>
                            </MuiThemeProvider>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired
}

export default ProfileItem;