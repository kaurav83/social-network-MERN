import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import CommentForm from './CommentForm';
import PostItem from '../posts/PostItem';
import Spinner from '../Spinner';
import { getPost } from '../../actions/postActions';
import CommentFeed from './CommentFeed';
import './Post.css';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

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

class Post extends Component {
    componentDidMount() {
        this.props.getPost(this.props.match.params.id);
    }

    render() {
        const { post, loading } = this.props.post;
        let postContent;

        if (post === null || loading || Object.keys(post).length === 0) {
            postContent = <h4 className="spinner"><Spinner /></h4>
        } else {
            postContent = (
                <div>
                    <PostItem post={post} showActions={false} />
                    <CommentForm postId={post._id} />
                    <CommentFeed postId={post._id} comments={post.comments} />
                </div>
            )
        }
        return (
            <div className="post">
                <div className="post__container">
                    <div className="post__content">
                        <MuiThemeProvider theme={theme}>
                            <Button
                                color="primary"
                                variant="contained"
                                style={{ textTransform: 'capitalize', color: "#fff", padding: "0", minHeight: "0" }}
                                className="go-back"
                            >
                                <Link
                                    to="/feed"
                                    className="BUTTON"
                                    style={{ display: "inline-block", padding: "8px 16px" }}
                                >
                                    Вернуться к записям
                                </Link>
                            </Button>
                        </MuiThemeProvider>
                        {postContent}
                    </div>
                </div>
            </div>
        )
    }
}

Post.propTypes = {
    post: PropTypes.object.isRequired,
    getPost: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    return {
        post: state.post
    };
};

export default connect(mapStateToProps, { getPost })(Post);