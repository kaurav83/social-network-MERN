import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../common/text_area_field_group';
import Button from '@material-ui/core/Button';
import { addComment } from '../../actions/postActions';

class CommentForm extends Component {
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
        const {postId} = this.props;
        
        const commentData = {
            text: this.state.text,
            name: user.name,
            avatar: user.avatar
        };

        this.props.addComment(postId, commentData);

        // ОЧИСТКА ТЕКСТОВОГО ПОЛЯ ПОСЛЕ ОТПРАВКИ ПОСТА 
        this.setState({text: ''});
    }

    render() {
        const {errors} = this.state;
        
        return (
            <div className="post-form">
                <div className="post-form-container">
                    <div className="post-form-content">
                        <h2 className="post-form-title">Написать комментарий...</h2>
                        <div className="post-form-wrap">
                            <form onSubmit={this.onSubmit}>
                                <TextAreaFieldGroup 
                                    placeholder="Комментировать"
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

CommentForm.propTypes = {
    addComment: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
    return {
        errors: state.errors,
        auth: state.auth
    };
}

export default connect(mapStateToProps, {addComment})(CommentForm);
