import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../common/text_area_field_group';
import Button from '@material-ui/core/Button';
import { addPost } from '../../actions/postActions';

class PostForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            errors: {}
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    // componentWillReceiveProps в данном случае нужен, чтобы принять объект с ошибками, 
    //чтобы для нашего поля появлялось сообщение об ошибке, если что то пошло не так
    componentWillReceiveProps(newProps) {
        if (newProps.errors) {
            this.setState({
                errors: newProps.errors
            });
        }
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const {user} = this.props.auth;

        const newPost = {
            text: this.state.text,
            name: user.name,
            avatar: user.avatar
        };

        this.props.addPost(newPost);

        // ОЧИСТКА ТЕКСТОВОГО ПОЛЯ ПОСЛЕ ОТПРАВКИ ПОСТА 
        this.setState({text: ''});
    }

    render() {
        const {errors} = this.state;

        return (
            <div className="post-form">
                <div className="post-form-container">
                    <div className="post-form-content">
                        <h2 className="post-form-title">Сделать запись</h2>
                        <div className="post-form-wrap">
                            <form onSubmit={this.onSubmit}>
                                <TextAreaFieldGroup 
                                    placeholder="Написать пост"
                                    name="text"
                                    value={this.state.text}
                                    onChange={this.onChange}
                                    error={errors.text}
                                />

                                <Button
                                    variant="contained"
                                    type="submit"
                                    color="secondary"
                                    style={{ width: "100%", margin: "0 0 0 0", borderRadius: "0" }}
                                >
                                    Отправить
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        errors: state.errors,
        auth: state.auth
    };
}

export default connect(mapStateToProps, {addPost})(PostForm);
