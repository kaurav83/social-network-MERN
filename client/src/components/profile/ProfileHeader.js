import React, { Component } from 'react';
import isEmpty from '../../validation/is_empty';

class ProfileHeader extends Component {
  render() {
    const {profile} = this.props;
    return (
      <div className="headerProfile-container">
        <div className="headerProfile-content">
          <img src={profile.user.avatar} alt="avatar"/>
          <div className="text-center">
            <h1 className="text-center">{profile.user.name}</h1>
            <p 
              className="text-lead text-center">
                {profile.status} 
                {isEmpty(profile.company) ? null : (<span>в {profile.company}</span>)}
            </p>
            <p className="heaerProfile-location">
              {isEmpty(profile.location) ? null : (<span>{profile.location}</span>)}
            </p>
          </div>
          <div className="text-center">
            {isEmpty(profile.website) ? null : (
              <a href={profile.website} target="_blank" className="headerProfile-link"  title="Веб-сайт">
                <i className="fas fa-globe fa-2x"></i>
              </a>
            )}

            {isEmpty(profile.social && profile.social.twitter) ? null : (
              <a href={profile.social.twitter} target="_blank" className="headerProfile-link">
                <i className="fab fa-twitter fa-2x"></i>
              </a>
            )}

            {isEmpty(profile.social && profile.social.linkedin) ? null : (
              <a href={profile.social.linkedin} target="_blank" className="headerProfile-link">
                <i className="fab fa-linkedin fa-2x"></i>
              </a>
            )}

            {isEmpty(profile.social && profile.social.vk) ? null : (
              <a href={profile.social.vk} target="_blank" className="headerProfile-link">
                <i className="fab fa-vk fa-2x"></i>
              </a>
            )}

            {isEmpty(profile.social && profile.social.youtube) ? null : (
              <a href={profile.social.youtube} target="_blank" className="headerProfile-link">
                <i className="fab fa-youtube fa-2x"></i>
              </a>
            )}

            {isEmpty(profile.social && profile.social.facebook) ? null : (
              <a href={profile.social.facebook} target="_blank" className="headerProfile-link">
                <i className="fab fa-facebook fa-2x"></i>
              </a>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default  ProfileHeader;