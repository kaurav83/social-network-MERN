import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PostItem from './PostItem';

class PostFeed extends Component {
  render() {
      const {posts} = this.props;
    return posts.map(itemPost => <PostItem key={itemPost._id} itemPost={itemPost} />)
  }
}

PostFeed.propTypes = {
    posts: PropTypes.array.isRequired
};

export default  PostFeed;
