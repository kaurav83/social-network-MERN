import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import {addExperience} from '../../actions/profileActions';

import TextFieldGroup from '../common/text_field_group';
import TextAreaFieldGroup from '../common/text_area_field_group';

import Checkbox from '@material-ui/core/Checkbox';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#FFCDD2',
            main: '#F44336',
            dark: '#FF1744',
            contrastText: '#000',
        },
        secondary: {
            light: '#CCFF90',
            main: '#76FF03',
            dark: '#64DD17',
            contrastText: '#000',
        },
    },
});

class AddExperience extends Component {
    constructor(props) {
        super(props);
        this.state = {
            company: '',
            title: '',
            location: '',
            from: '',
            to: '',
            current: false,
            description: '',
            errors: {},
            disabled: false
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCheck = this.onCheck.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
    }

    onSubmit(e) {
        e.preventDefault();

        const experienceData = {
            company: this.state.company,
            title: this.state.title,
            location: this.state.location,
            from: this.state.from,
            to: this.state.to,
            current: this.state.current,
            description: this.state.description
        }

        this.props.addExperience(experienceData, this.props.history);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onCheck(e) {
        this.setState({
          disabled: !this.state.disabled,
          current: !this.state.current
        });
    }

    render() {
        const { errors } = this.state;

        return (
            <div className="add-experience">
                <div className="add-experience__container">
                    <div className="add-experience__content">
                        <MuiThemeProvider theme={theme}>
                            <Button
                                color="primary"
                                variant="contained"
                                style={{ textTransform: 'capitalize', color: "#fff" }}
                            >
                                <Link to="/dashboard" className="go-back">
                                    Вернуться
                                </Link>
                            </Button>
                        </MuiThemeProvider>
                        <h1 className="text-center">Добавить опыт</h1>
                        <p className="text-center">
                            Добавить место работы или должность на которой вы были заняты ранее или в настоящее время
                        </p>
                        <small className="">* = эти поля обязательны</small>
                        <form onSubmit={this.onSubmit}>
                            <div className="input-group">
                                <TextFieldGroup
                                    placeholder="* Компания"
                                    name="company"
                                    value={this.state.company}
                                    onChange={this.onChange}
                                    error={errors.company}
                                />
                            </div>
                            <div className="input-group">
                                <TextFieldGroup
                                    placeholder="* Должность/Специальность"
                                    name="title"
                                    value={this.state.title}
                                    onChange={this.onChange}
                                    error={errors.title}
                                />
                            </div>
                            <div className="input-group">
                                <TextFieldGroup
                                    placeholder="Местоположение"
                                    name="location"
                                    value={this.state.location}
                                    onChange={this.onChange}
                                    error={errors.location}
                                />
                            </div>
                            <div className="input-group">
                                <h6>Начиная с</h6>
                                <TextFieldGroup
                                    name="from"
                                    type="date"
                                    value={this.state.from}
                                    onChange={this.onChange}
                                    error={errors.from}
                                />
                            
                                <h6>по</h6>
                            
                                <TextFieldGroup
                                    name="to"
                                    type="date"
                                    value={this.state.to}
                                    onChange={this.onChange}
                                    error={errors.to}
                                    disabled={this.state.disabled ? 'disabled' : ''}
                                />
                            </div>
                                <div>
                                    <Checkbox 
                                        color="primary" 
                                        className="form-checkbox"
                                        name="current"
                                        value={this.state.current}
                                        checked={this.state.current}
                                        onChange={this.onCheck}
                                        id="current"
                                    />
                                    <label htmlFor="current">Текущее место работы</label>
                                </div>
                                <TextAreaFieldGroup 
                                    placeholder="Описание места работы"
                                    name="description"
                                    value={this.state.description}
                                    onChange={this.onChange}
                                    error={errors.description}
                                    info="Расскажите нам об этой позиции"
                                />
                                <MuiThemeProvider theme={theme}>
                                    <Button
                                        color="secondary"
                                        variant="contained"
                                        // style={{ textTransform: 'capitalize', color: "#fff" }}
                                        type="submit"
                                    >
                                        Отправить
                                   </Button>
                                </MuiThemeProvider>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

AddExperience.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    addExperience: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    return {
        profile: state.profile,
        errors: state.errors
    };
};

export default connect(mapStateToProps, {addExperience})(withRouter(AddExperience));