import React, { Component } from 'react';
import isEmpty from '../../validation/is_empty';

import BigImageAvatars from '../common/BigAvatar';

class ProfileHeader extends Component {
  render() {
    const { profile } = this.props;
    return (
      <div className="headerProfile-container">
        <div className="headerProfile-content">
          <div className="profile-image-block">
            <BigImageAvatars profile={profile} />
          </div>
          <div className="headerProfile-data">
            <div className="headerProfile-data__left">
              <h1 className="headerProfile-data__name">{profile.user.name}</h1>
              <h2 className="headerProfile-data__status">
                {profile.status}
              </h2>
              <h3 className="headerProfile-data__location">
                {isEmpty(profile.location) ? null : (<span>{profile.location}</span>)}
              </h3>
            </div>
            <div className="headerProfile-data__right">
              <p
                className="headerProfile-data__right-text">
                {isEmpty(profile.company) ? null : (<span>{profile.status}  в {profile.company}</span>)}
              </p>
              <section className="headerProfile-data__socials">
                {isEmpty(profile.website) ? null : (
                  <a href={profile.website} target="_blank" className="headerProfile-link" title="Веб-сайт">
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
              </section>
              
            </div>
          </div>

        </div>
      </div>
    )
  }
}

export default ProfileHeader;