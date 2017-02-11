import React, { PropTypes } from 'react';
import { inject } from 'mobx-react';

@inject('github')
class AuthCallback extends React.Component {

  static get propTypes() {
    return {
      location: PropTypes.object.isRequired,
      github: PropTypes.object.isRequired,
    };
  }

  componentDidMount() {
    const query = this.props.location.query;
    this.props.github.auth(query.code, query.state);
  }

  render = () => (
    <div />
  )
}

export default AuthCallback;
