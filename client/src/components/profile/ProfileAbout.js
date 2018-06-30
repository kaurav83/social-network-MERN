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
                <div key={index} className="headerAbout-skill">
                    <i className="fa fa-check"> {skill}</i>
                </div>
            )
        })

        return (
            <div className="headerAbout-container">
                <div className="headerAbout-content">
                    <h3 className="text-center text-info">{firstName} о себе</h3>
                    <p className="headerAbout-text-lead">
                        {isEmpty(profile.bio) ? 
                            <span>{firstName} ничего о себе пока что не написал</span> 
                            : 
                            (<span>{profile.bio}</span>)
                        }
                    </p>
                    <hr/>
                    <h3 className="text-center text-info">Навыки</h3>
                    <div className="headerAbout-skills">
                        {skills}
                    </div>
                </div>
            </div>
        )
    }
}

ProfileAbout.propTypes = {
    profile: PropTypes.object.isRequired
}

export default ProfileAbout;