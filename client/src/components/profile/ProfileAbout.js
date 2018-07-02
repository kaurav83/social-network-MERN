import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from '../../validation/is_empty';

class ProfileAbout extends Component {
    render() {
        const {profile} = this.props;

        //получаем имя
        const firstName = profile.user.name.trim().split(' ')[0];

        // список навыков
        const skills = profile.skills.map((skill, index) => {
            return (
                <li key={index} className="headerAbout-skill__item">
                    <i className="fa fa-check"> <span>{skill}</span></i>
                </li>
            )
        })

        return (
            <div className="headerAbout-container">
                <div className="headerAbout-content">
                    <h3 className="headerAbout-text-center">{firstName} о себе</h3>
                    <p className="headerAbout-text-lead">
                        {isEmpty(profile.bio) ? 
                            <span>{firstName} ничего о себе пока что не написал</span> 
                            : 
                            (<span>{profile.bio}</span>)
                        }
                    </p>
                    <hr/>
                    <h3 className="headerAbout-text-center">Навыки</h3>
                    <ul className="headerAbout-skill__list">
                        {skills}
                    </ul>
                </div>
            </div>
        )
    }
}

ProfileAbout.propTypes = {
    profile: PropTypes.object.isRequired
}

export default ProfileAbout;