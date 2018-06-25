import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/text_field_group';

class CreateProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            displaySocialInput: false,
            handle: '',
            company: '',
            website: '',
            location: '',
            status: '',
            skills: '',
            githubusername: '',
            bio: '',
            twitter: '',
            facebook: '',
            linkedin: '',
            youtube: '',
            instagram: '',
            errors: {}
        }
    }
    render() {
        return (
            <div className="create-profile">
                <div className="create-profile-wrapper">
                    <div className="create-profile-container">
                        <h1 className="create-profile-title">
                            Создайте Ваш профиль
                        </h1>
                        <p className="create-profile-text">
                            Заполните как можно больше полей, чтобы сделать ваш профиль более информативным
                        </p>
                        <small className="create-profile-small-text">* = обязательные поля</small>
                    </div>
                </div>
            </div>
        )
    }
}

CreateProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        profile: state.profile,
        errors: state.errors
    }
}

export default connect(null)(CreateProfile);