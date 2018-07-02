import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getPosts} from '../../actions/postActions';
import Spinner from '../Spinner';
import PostForm from './PostForm';
import PostFeed from './PostFeed';

import './Posts.css';
 
class Posts extends Component {
    componentDidMount() {
        this.props.getPosts();
    }
  render() {
      const {posts, loading} = this.props.post;
      let postContent;

      if (posts === null || loading) {
          postContent = <h4 className="spinner"><Spinner /></h4>;
      } else {
          postContent = <PostFeed posts={posts}  />
      }
    return (
      <div className="feed">
        <div className="feed-container">
            <div className="feed-content">
                <PostForm />
                {postContent}
            </div>
        </div>
      </div>
    )
  }
}

Posts.propTypes = {
    post: PropTypes.object.isRequired,
    getPosts: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        post: state.post,
        loading: state.loading
    };
};

export default connect(mapStateToProps, {getPosts})(Posts);