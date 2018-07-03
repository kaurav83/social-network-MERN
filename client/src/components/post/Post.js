import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import PostItem from '../posts/PostItem';
import Spinner from '../Spinner';
import {getPost} from '../../actions/postActions';
import './Post.css';

class Post extends Component {
    componentDidMount() {
        this.props.getPost(this.props.match.params.id);
    }

  render() {
      const {post, loading} = this.props.post;
      let postContent;

      if (post === null || loading || Object.keys(post).length === 0) {
        postContent = <h4 className="spinner"><Spinner /></h4>
      } else {
          postContent = (
              <div>
                  <PostItem post={post} showActions={false} />
              </div>
          )
      }
    return (
      <div className="post">
        <div className="post__container">
            <div className="post__content">
                <Link 
                    to="/feed" 
                    className="BUTTON"
                >
                    Вернуться к записям
                </Link>
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
    console.log(state)
    return {
        post: state.post
    };
};

export default  connect(mapStateToProps, {getPost})(Post);