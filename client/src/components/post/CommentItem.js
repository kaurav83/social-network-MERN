import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteComment } from '../../actions/postActions';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

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


class CommentItem extends Component {
    onDeleteClick(postId, commentId) {
        this.props.deleteComment(postId, commentId);
    }

    render() {
        const { comment, postId, auth } = this.props;
        return (
            <div className="comment">
                <div className="comment-container">
                    <div className="comment-content">
                        <div className="comment__person">
                            <img
                                src={comment.avatar}
                                alt={comment.name}
                                className="comment__person-avatar"
                            />
                            <p className="comment__person-name">{comment.name}</p>
                        </div>
                        <div className="comment__field">
                            <p className="comment__field-text">
                                {comment.text}
                            </p>
                            {comment.user === auth.user.id ? (
                                <MuiThemeProvider theme={theme}>
                                    <IconButton
                                        color="primary"
                                        // variant="contained"
                                        // title="Удалить"
                                        onClick={this.onDeleteClick.bind(this, postId, comment._id)}
                                    >
                                        <Delete className="delete-icon icon" />
                                    </IconButton>
                                </MuiThemeProvider>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

CommentItem.propTypes = {
    deleteComment: PropTypes.func.isRequired,
    comment: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, { deleteComment })(CommentItem);