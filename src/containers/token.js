import React, { PropTypes } from 'react';
import { inject } from 'mobx-react';
import { Modal, Button, FormControl } from 'react-bootstrap';
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
    <Modal show>
      <Modal.Header>
        Enter github token
      </Modal.Header>
      <Modal.Body>
        <FormControl
          value={this.state.token}
          onChange={this.handleChange}
        />
        <br />
        <TokenStatus />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={this.onClick}>Save</Button>
      </Modal.Footer>
    </Modal>
    )
}

export default TokenModal;
