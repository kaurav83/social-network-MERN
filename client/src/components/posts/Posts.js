import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addPost} from '../../actions/postActions';
import Spinner from '../Spinner';
import PostForm from './PostForm';
 
class Posts extends Component {
  render() {
    return (
      <div className="feed">
        <div className="feed-container">
            <div className="feed-content">
                <PostForm />
            </div>
        </div>
      </div>
    )
  }
}

Posts.propTypes = {

};

const mapStateToProps = (state) => {
    return {

    };
};

export default connect(mapStateToProps, {addPost})(Posts);