import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

// local components
import { LoginForm } from '../../components/';


class Authentication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      credential: {
        username: '',
        password: '',
      },
      showFieldErrors: false,
    };
    this.getFieldLengthValidationState = this.getFieldLengthValidationState.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.focusOnFirstInputWithError = this.focusOnFirstInputWithError.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  getFieldLengthValidationState(fieldName, minLength = 1) {
    const { credential, showFieldErrors } = this.state;
    const length = credential[fieldName].length;
    if (length < minLength && showFieldErrors) {
      return 'error';
    }
    return null;
  }

  focusOnFirstInputWithError() {
    const { username, password } = this.state.credential;
    if (!username) {
      this.usernameInput.focus();
    } else if (!password) {
      this.passwordInput.focus();
    }
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { credential } = this.state;
    credential[name] = value;
    this.setState({ credential });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { username, password } = this.state.credential;
    if (username && password) {
      this.props.loginUser(this.state.credential);
    } else {
      // show user helpful hightlights around invalid inputs
      this.setState({ showFieldErrors: true });
      this.focusOnFirstInputWithError();

      // add shake animation to login button
      const elem = document.getElementById('login-button');
      elem.classList.add('element-shake');
      setTimeout(() => elem.classList.remove('element-shake'), 500);
    }
  }

  render() {
    return (
      <LoginForm
        credential={this.state.credential}
        getFieldLengthValidationState={this.getFieldLengthValidationState}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        loading={this.props.loading}
        passwordRef={(input) => { this.passwordInput = input; }}
        showFieldErrors={this.state.showFieldErrors}
        usernameRef={(input) => { this.usernameInput = input; }}
      />
    );
  }
}

Authentication.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  loginUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export { Authentication };
export default withRouter(Authentication);