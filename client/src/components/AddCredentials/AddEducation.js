import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { addEducation } from '../../actions/profileActions';

import TextFieldGroup from '../common/text_field_group';
import TextAreaFieldGroup from '../common/text_area_field_group';

import Checkbox from '@material-ui/core/Checkbox';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import './AddCredentials.css';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#fff9c4',
            main: '#ffeb3b',
            dark: '#ffc107',
            contrastText: '#000',
        }
    },
});

class AddEducation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            school: '',
            degree: '',
            fieldofstudy: '',
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
            this.setState({ errors: nextProps.errors });
        }
    }

    onSubmit(e) {
        e.preventDefault();

        const educationData = {
            school: this.state.school,
            degree: this.state.degree,
            fieldofstudy: this.state.fieldofstudy,
            from: this.state.from,
            to: this.state.to,
            current: this.state.current,
            description: this.state.description
        }

        this.props.addEducation(educationData, this.props.history);
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
            <div className="add-credentials">
                <div className="add-credentials__container">
                    <div className="add-credentials__content">
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
                        <h1 className="text-center">Добавить образование</h1>
                        <p className="text-center">
                            Добавить ВУЗ, учебные курсы и т.д., которые вы посещали
                        </p>
                        <small className="small-require">* = эти поля обязательны</small>
                        <form onSubmit={this.onSubmit}>
                            <div className="input-group">
                                <TextFieldGroup
                                    placeholder="* ВУЗ"
                                    name="school"
                                    value={this.state.school}
                                    onChange={this.onChange}
                                    error={errors.school}
                                />
                            </div>
                            <div className="input-group">
                                <TextFieldGroup
                                    placeholder="* Степень или Квалификация"
                                    name="degree"
                                    value={this.state.degree}
                                    onChange={this.onChange}
                                    error={errors.degree}
                                />
                            </div>
                            <div className="input-group">
                                <TextFieldGroup
                                    placeholder="* Специальность"
                                    name="fieldofstudy"
                                    value={this.state.fieldofstudy}
                                    onChange={this.onChange}
                                    error={errors.fieldofstudy}
                                />
                            </div>
                            <div className="input-group">
                                <h6>с</h6>
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
                                <label htmlFor="current">Текущее место учёбы</label>
                            </div>
                            <TextAreaFieldGroup
                                placeholder="Описание учебной программы"
                                name="description"
                                value={this.state.description}
                                onChange={this.onChange}
                                error={errors.description}
                                info="Расскажите нам о том, чему вас учили"
                            />
                            <MuiThemeProvider theme={theme}>
                                <Button
                                    color="secondary"
                                    variant="contained"
                                    // style={{ textTransform: 'capitalize', color: "#fff" }}
                                    type="submit"
                                    fullWidth
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

AddEducation.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    addEducation: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    return {
        profile: state.profile,
        errors: state.errors
    };
};

export default connect(mapStateToProps, { addEducation })(withRouter(AddEducation));