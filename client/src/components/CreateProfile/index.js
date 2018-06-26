import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/text_field_group';
import InputGroup from '../common/input_group';
import SelectListGroup from '../common/select_list_group';
import TextAreaFieldGroup from '../common/text_area_field_group';

import Button from '@material-ui/core/Button';

class CreateProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            displaySocialInputs: false,
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
            vk: '',
            errors: {}
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.toggleSocialNetworksButton = this.toggleSocialNetworksButton.bind(this);
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        console.log('submit');
    }

    toggleSocialNetworksButton() {
        this.setState(prevState => ({
            displaySocialInputs: !prevState.displaySocialInputs
        }));
    }

    render() {
        const { errors, displaySocialInputs } = this.state;

        let socialInputs;

        if (displaySocialInputs) {
            socialInputs = (
                <div>
                    <InputGroup
                        placeholder="Ссылка на профиль в Twitter"
                        name="twitter"
                        icon="twitter"
                        value={this.state.twitter}
                        onChange={this.onChange}
                        error={errors.twitter}
                    />

                    <InputGroup
                        placeholder="Ссылка на профиль в LinkedIn"
                        name="linkedin"
                        icon="linkedin"
                        value={this.state.linkedin}
                        onChange={this.onChange}
                        error={errors.linkedin}
                    />

                    <InputGroup
                        placeholder="Ссылка на профиль в Youtube"
                        name="youtube"
                        icon="youtube"
                        value={this.state.youtube}
                        onChange={this.onChange}
                        error={errors.youtube}
                    />

                    <InputGroup
                        placeholder="Ссылка на профиль в Instagram"
                        name="instagram"
                        icon="instagram"
                        value={this.state.instagram}
                        onChange={this.onChange}
                        error={errors.instagram}
                    />

                    <InputGroup
                        placeholder="Ссылка на профиль в Вконтакте"
                        name="vk"
                        icon="vk"
                        value={this.state.vk}
                        onChange={this.onChange}
                        error={errors.vk}
                    />

                    <InputGroup
                        placeholder="Ссылка на профиль в Facebook"
                        name="facebook"
                        icon="facebook"
                        value={this.state.facebook}
                        onChange={this.onChange}
                        error={errors.facebook}
                    />
                </div>
            )
        }

        // Select options for status
        const options = [
            {
                label: '* Выберете профессиональный статус',
                value: 0
            },
            {
                label: 'Developer',
                value: 'Developer'
            },
            {
                label: 'Junior Developer',
                value: 'Junior Developer'
            },
            {
                label: 'Senior Developer',
                value: 'Senior Developer'
            },
            {
                label: 'Manager',
                value: 'Manager'
            },
            {
                label: 'Student or Learning',
                value: 'Student or Learning'
            },
            {
                label: 'Instructor or Teacher',
                value: 'Instructor or Teacher'
            },
            {
                label: 'Intern',
                value: 'Intern'
            },
            {
                label: 'Другое',
                value: 'Другое'
            }
        ];
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
                        <form onSubmit={this.onSubmit}>
                            <TextFieldGroup
                                placeholder="* Управление профилем"
                                name="handle"
                                value={this.state.handle}
                                onChange={this.onChange}
                                error={errors.handle}
                                info="Уникальный обработчик для вашего URL профиля. Ваше полное имя, название компании, никнейм и т.д."
                            />

                            <SelectListGroup
                                placeholder="Статус"
                                name="status"
                                value={this.state.status}
                                onChange={this.onChange}
                                error={errors.status}
                                options={options}
                                info="Дайте нам знать, где вы находитесь в вашей карьере"
                            />

                            <TextFieldGroup
                                placeholder="Компания"
                                name="company"
                                value={this.state.company}
                                onChange={this.onChange}
                                error={errors.company}
                                info="Возможно это ваша собственная компания или та, в которой вы работаете"
                            />

                            <TextFieldGroup
                                placeholder="Вебсайт"
                                name="website"
                                value={this.state.website}
                                onChange={this.onChange}
                                error={errors.website}
                                info="Возможно это ваш личный сайт или сайт компании"
                            />

                            <TextFieldGroup
                                placeholder="Местоположение"
                                name="location"
                                value={this.state.location}
                                onChange={this.onChange}
                                error={errors.location}
                                info="Город или область (например Одесса)"
                            />

                            <TextFieldGroup
                                placeholder="* Навыки"
                                name="skills"
                                value={this.state.skills}
                                onChange={this.onChange}
                                error={errors.skills}
                                info="Пожалуйста, используйте запятые при перечислении (прим. HTML, CSS, JS, PHP)"
                            />

                            <TextFieldGroup
                                placeholder="Никнейм на Github"
                                name="githubusername"
                                value={this.state.githubusername}
                                onChange={this.onChange}
                                error={errors.githubusername}
                                info="Если вы хотите использовать свои последние репозитории и ссылку Github, укажите свое имя пользователя"
                            />

                            <TextAreaFieldGroup
                                placeholder="Краткая биография"
                                name="bio"
                                value={this.state.bio}
                                onChange={this.onChange}
                                error={errors.bio}
                                info="Расскажите нам немного о себе"
                            />

                            <div className="button">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    style={{ margin: "1rem .5rem", textTransform: 'capitalize' }}
                                    onClick={this.toggleSocialNetworksButton}
                                >
                                    Добавить ссылки на соцсети
                                    </Button>
                                <span className="text-muted">Необязательно</span>
                            </div>
                            {socialInputs}
                            <input type="submit"/>
                        </form>
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

export default connect(mapStateToProps)(CreateProfile);