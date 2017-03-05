import React, { PropTypes } from 'react';
import { inject } from 'mobx-react';
import { FlatButton, FontIcon } from 'material-ui';
import { Card, CardText } from 'material-ui/Card';
import TokenStatus from '../components/token-status';

@inject(['github'])
class TokenModal extends React.Component {

  static get propTypes() {
    return {
      github: PropTypes.object.isRequired,
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

  render = () => (
    <Card>
      <CardText>
        <div className="flex center-x">
          <FlatButton
            href={'https://github.com/login/oauth/authorize?client_id=141ecf805fa1444bc6c3&redirect_uri=http://127.0.0.1:3000/callback&state=HelloWorld1234'}
            label="Login with github"
            icon={<FontIcon className="muidocs-icon-custom-github" />}
          />
        </div>
      </CardText>
      <TokenStatus />
    </Card>
    )
}

export default TokenModal;
