import React, { PropTypes } from 'react';
import { inject } from 'mobx-react';
import { Button, Panel } from 'react-bootstrap';
import TokenStatus from '../components/token-status';

@inject(['github'])
class TokenModal extends React.Component {

  static get propTypes() {
    return {
      github: PropTypes.object.isRequired,
      params: PropTypes.object.isRequired,
    };
  }

  state = {
    token: '',
    state: 'NO_TOKEN',
  }

  onClick = () => {
    this.setState({ state: 'CHECKING' });
    this.props.github
      .setToken(this.state.token, this.callback);
  }

  handleChange = (event) => {
    this.setState({ token: event.target.value });
  }

  callback = (err) => {
    if (err) {
      this.setState({ state: 'FAILED' });
    } else {
      this.setState({ state: 'SUCCESS' });
    }
  }

  render = () => {
    console.log(this.props.params);
    return (
      <Panel>
        <Button>
          <a href={'https://github.com/login/oauth/authorize?client_id=141ecf805fa1444bc6c3&redirect_uri=http://127.0.0.1:3000/callback&state=HelloWorld1234'}>Login with github</a>
        </Button>
        <TokenStatus />
      </Panel>
    );
  }
}

export default TokenModal;
