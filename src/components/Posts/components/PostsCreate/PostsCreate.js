import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  FormControl,
  FormGroup,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';

import './PostsCreate.css';

import { DEFAULT_PROFILE_PIC } from '../../../../constants';

class PostsCreate extends React.Component {
  constructor(props) {
    super(props);
    this.defaultMessage = "What's happening?";
    this.state = {
      isActive: false,
      post: '',
    };
    this.handleFocusOnInactiveFormInput = this.handleFocusOnInactiveFormInput.bind(this);
    this.handleBlurActiveFormInput = this.handleBlurActiveFormInput.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleFocusOnInactiveFormInput() {
    this.setState({ isActive: true });
  }

  handleBlurActiveFormInput() {
    if (!this.state.post) {
      this.setState({ isActive: false });
    }
  }

  handleChange(event) {
    const value = event.currentTarget.value;
    this.setState({ post: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.createPost(this.state.post);
    this.setState({ isActive: false });
  }

  render() {
    const tooltip = (
      <Tooltip id="tooltip">
        Add photos or video
      </Tooltip>
    );

    const activeFormInput = (
      <FormGroup controlId="formControlsTextarea">
        <FormControl
          componentClass="textarea"
          placeholder={this.defaultMessage}
          autoFocus
          onBlur={this.handleBlurActiveFormInput}
          onChange={this.handleChange}
        />
      </FormGroup>
    );

    const inActiveFormInput = (
      <FormGroup controlId="formBasicText" onFocus={this.handleFocusOnInactiveFormInput}>
        <FormControl type="text" value={this.defaultMessage} readOnly />
      </FormGroup>
    );

    const postCreateBoxToolbar = (
      <div className="post-create-box-toolbar">
        <div className="post-create-box-extras">
          <span className="post-create-box-extras-item post-create-box-media-picker">
            <div className="photo-selector">
              <OverlayTrigger placement="top" overlay={tooltip}>
                <Button bsClass="btn icon-btn">
                  <span className="post-create-camera Icon Icon--extra-large">
                    <i className="fa fa-camera" aria-hidden="true" />
                  </span>
                </Button>
              </OverlayTrigger>
            </div>
          </span>
        </div>
        <div className="create-post-button">
          <Button bsClass="btn btn-info post-btn" type="submit" onClick={this.handleSubmit}>
            <span className="button-text posting-text">
              <span className="Icon icon-post-create">
                <i className="fa fa-paint-brush" aria-hidden="true" />
              </span>
              Post
            </span>
          </Button>
        </div>
      </div>
    );

    return (
      <div className="post-create-box">
        <div className="home-post-create-box post-create-box-component app-user">
          <img
            className="post-create-box-user-img avatar size32"
            src={this.props.profile ? this.props.profile.profile_pic : DEFAULT_PROFILE_PIC}
            alt="Erika Dike"
          />
          <form className="post-create-form">
            <div className="rich-editor">
              <div className="rich-editor-container u-border-radius-inherit fake-focus">
                <div className="rich-editor-scroll-container u-border-radius-inherit">
                  {this.state.isActive ? activeFormInput : inActiveFormInput}
                </div>
              </div>
            </div>
            {this.state.isActive ? postCreateBoxToolbar : null}
          </form>
        </div>
      </div>
    );
  }
}

PostsCreate.defaultProps = {
  profile: null,
};

PostsCreate.propTypes = {
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
};

export default PostsCreate;
