import React from 'react';
import PropTypes from 'prop-types';
import WayPoint from 'react-waypoint';

import { ContentPlaceholder, PostItem } from '../../../../components/';

import './PostsList.css';


class PostsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      statusMessage: this.LOADING_MESSAGE,
    };
    this.loadMorePosts = this.loadMorePosts.bind(this);
    this.renderContentPlaceholder = this.renderContentPlaceholder.bind(this);
    this.renderWayPoint = this.renderWayPoint.bind(this);
  }

  LOADING_MESSAGE = 'Loading more posts ...';
  CAUGHT_UP_MESSAGE = 'You are caught up';

  loadMorePosts() {
    const { next } = this.props;
    if (next) {
      const queryParams = next.slice(next.indexOf('?'));
      this.props.fetchPosts(queryParams);
    } else {
      this.setState({ statusMessage: this.CAUGHT_UP_MESSAGE });
    }
  }

  renderContentPlaceholder() {
    return (
      <ContentPlaceholder
        number={2}
        addNotification={this.props.addNotification}
      />);
  }

  renderWayPoint() {
    if (!this.state.isLoading) {
      return (
        <WayPoint onEnter={this.loadMorePosts} />
      );
    }
    return null;
  }

  renderLoader() {
    if (this.props.next) {
      return (
        <span>
          <i className="fa fa-spinner fa-pulse fa-3x fa-fw post-loader" />
          <span className="sr-only">Loading...</span>
        </span>
      );
    }
    return null;
  }

  render() {
    const {
      deletePost,
      fetched,
      insertPostIntoCreateBox,
      lovePost,
      pending,
      posts,
      profile,
      unlovePost,
    } = this.props;
    let mappedPostItems;

    if (posts.length) {
      mappedPostItems = posts.map(post =>
        <PostItem
          key={post.id}
          deletePost={deletePost}
          insertPostIntoCreateBox={insertPostIntoCreateBox}
          lovePost={lovePost}
          post={post}
          profile={profile}
          unlovePost={unlovePost}
        />,
      );
    }

    const emptyPostsMessage = (
      <div id="empty-posts-list-message" className="text-center">
        You have not created any posts yet.
      </div>
    );

    return (
      <div className="stream-container conversations-enabled">
        <div className="stream">
          <ol
            className="stream-items"
            id="stream-items-id"
          >
            {!posts.length && pending ? this.renderContentPlaceholder() : null}

            {!posts.length && !pending ? emptyPostsMessage : null}

            {posts.length ? mappedPostItems : null}
          </ol>
        </div>
        {this.renderWayPoint()}
        {this.renderLoader()}
      </div>
    );
  }
}

PostsList.defaultProps = {
  next: null,
  profile: null,
};

PostsList.propTypes = {
  addNotification: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  fetched: PropTypes.bool.isRequired,
  fetchPosts: PropTypes.func.isRequired,
  insertPostIntoCreateBox: PropTypes.func.isRequired,
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

export default PostsList;
