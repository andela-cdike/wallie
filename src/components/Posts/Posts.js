import React from 'react';
import PropTypes from 'prop-types';

import { PostsCreate, PostsList } from './components';

import './Posts.css';

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postToEdit: null,
    };
    this.insertPostIntoCreateBox = this.insertPostIntoCreateBox.bind(this);
    this.removePostFromCreateBox = this.removePostFromCreateBox.bind(this);
  }

  insertPostIntoCreateBox(post) {
    const postToEdit = {
      id: post.id,
      content: post.content,
    };
    this.setState({ postToEdit });
  }

  removePostFromCreateBox() {
    this.setState({ postToEdit: null });
  }

  render() {
    return (
      <main className="content-main">
        {this.props.profile
          ?
            <PostsCreate
              addNotification={this.props.addNotification}
              createPost={this.props.createPost}
              editPost={this.props.editPost}
              fetched={this.props.fetched}
              pending={this.props.pending}
              postToEdit={this.state.postToEdit}
              profile={this.props.profile}
              removePostFromCreateBox={this.removePostFromCreateBox}
            />
          :
            null
        }
        <PostsList
          addNotification={this.props.addNotification}
          deletePost={this.props.deletePost}
          fetched={this.props.fetched}
          fetchPosts={this.props.fetchPosts}
          insertPostIntoCreateBox={this.insertPostIntoCreateBox}
          lovePost={this.props.lovePost}
          next={this.props.next}
          pending={this.props.pending}
          posts={this.props.posts}
          profile={this.props.profile}
          unlovePost={this.props.unlovePost}
        />
      </main>
    );
  }
}

Posts.defaultProps = {
  next: null,
  profile: null,
};

Posts.propTypes = {
  addNotification: PropTypes.func.isRequired,
  createPost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  editPost: PropTypes.func.isRequired,
  fetched: PropTypes.bool.isRequired,
  fetchPosts: PropTypes.func.isRequired,
  lovePost: PropTypes.func.isRequired,
  next: PropTypes.string,
  pending: PropTypes.bool.isRequired,
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      date_created: PropTypes.string,
      content: PropTypes.string,
      author: PropTypes.shape({
        username: PropTypes.string,
        first_name: PropTypes.string,
        last_name: PropTypes.string,
        about: PropTypes.string,
        profile_pic: PropTypes.string,
      }),
      num_loves: PropTypes.number,
      in_love: PropTypes.bool,
    }),
  ).isRequired,
  profile: PropTypes.shape({
    user: PropTypes.shape({
      username: PropTypes.string,
      first_name: PropTypes.string,
      last_name: PropTypes.string,
      email: PropTypes.string,
      num_posts: PropTypes.number,
    }),
    about: PropTypes.string,
    profile_pic: PropTypes.string,
  }),
  unlovePost: PropTypes.func.isRequired,
};

export default Posts;
