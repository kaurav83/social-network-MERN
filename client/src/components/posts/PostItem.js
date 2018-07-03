import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import PostAvatar from '../common/PostAvatar';
import {deletePost, addLike, removeLike} from '../../actions/postActions';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';
import Delete from '@material-ui/icons/Delete';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import spacing from '@material-ui/core/styles/spacing';

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
        }
    },
});

class PostItem extends Component {

    onDeleteClick(id) {
        this.props.deletePost(id);
    }

    onLike(id) {
        this.props.addLike(id);
    }

    onUnlike(id) {
        this.props.removeLike(id);
    }

    findUserClicked(likes) {
        const {auth} = this.props;
        if (likes.filter(like => like.user === auth.user.id).length > 0) {
            return true;
        } else {
            return false;
        }
    }

    render() {
        const { post, auth, showActions } = this.props;

        return (
            <div className="post-item">
                <div className="post-item__container">
                    <div className="post-item__content">
                        <div className="post-item__link">
                            <PostAvatar post={post} />
                            <p className="post-item__text">{post.name}</p>
                        </div>
                        <div className="post-item__inner-content">
                            <p className="post-item__lead-text">{post.text}</p>

                            {
                                showActions ? (
                                    <span>
                                        <MuiThemeProvider theme={theme}>
                                <IconButton
                                    color="secondary"
                                    // title="Удалить"
                                    onClick={this.onLike.bind(this, post._id)}
                                >
                                    <ThumbUp className={classnames("thumb-up icon", {
                                        'text-info-btn': this.findUserClicked(post.likes)
                                    })} />
                                    <span className="counter-likes">{post.likes.length}</span>
                                </IconButton>
                            </MuiThemeProvider>
                            <MuiThemeProvider theme={theme}>
                                <IconButton
                                    color="secondary"
                                    // title="Удалить"
                                    onClick={this.onUnlike.bind(this, post._id)}
                                >
                                    <ThumbDown className="thumb-down icon" />
                                </IconButton>
                            </MuiThemeProvider>

                            <MuiThemeProvider theme={theme}>
                                <Button
                                        color="secondary"
                                        variant="contained"
                                        // title="Удалить"
                                >
                                    <Link to={`/post/${post._id}`} className="link-to-id">
                                        Комментарии
                                    </Link>
                                </Button>
                            </MuiThemeProvider>
                            {post.user === auth.user.id ? (
                                <MuiThemeProvider theme={theme}>
                                    <IconButton
                                        color="primary"
                                        // variant="contained"
                                        // title="Удалить"
                                        onClick={this.onDeleteClick.bind(this, post._id)}
                                    >
                                        <Delete className="delete-icon icon" />
                                    </IconButton>
                                </MuiThemeProvider>
                            ) : null}
                                    </span>
                                ) : null
                            
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

PostItem.defaultProps = {
    showActions: true
}

PostItem.propTypes = {
    // post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    deletePost: PropTypes.func.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    return {
        auth: state.auth
    };
};

export default connect(mapStateToProps, {deletePost, addLike, removeLike})(PostItem);