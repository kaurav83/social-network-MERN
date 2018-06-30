import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import isEmpty from '../../validation/is_empty';

class ProfileItem extends Component {
  render() {
    const {profile} = this.props;

    return (
      <div className="profile-item">
        <div className="profile-card">
            <div className="image-avatar">
                <img src={profile.user.avatar} alt="avatar" className="rounded-circle"/>
            </div>
            <div className="profile-data">
                <h3>{profile.user.name}</h3>
                <p>
                    {profile.status} {isEmpty(profile.company) ? null : <span>at {profile.company}</span>}
                </p>
                <p>
                    {isEmpty(profile.location) ? null : (<span>{profile.location}</span>)}
                </p>
                <Link to={`/profile/${profile.handle}`} className="button-info">
                    Посмотреть профиль
                </Link>
            </div>
            <div className="skills-set">
                <h4>Навыки</h4>
                <ul className="list-group">
                    {profile.skills.slice(0, 4).map((item, index) => (
                        <li key={index} className="list-group-item">
                            <i className="fa fa-check pr-1">
                                {item}
                            </i>
                        </li>
                    ))}
                </ul>
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