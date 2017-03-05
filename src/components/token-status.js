import React, { PropTypes } from 'react';
import { Snackbar } from 'material-ui';
import { inject, observer } from 'mobx-react';

@inject('github')
@observer
class Status extends React.Component {

  static get propTypes() {
    return {
      github: PropTypes.object.isRequired,
    };
  }

  state = {
    open: false,
  }

  onClose = () => {
    this.setState({ open: false });
  }

  render = () => {
    let status = 'Checking token...';
    let open = true;
    if (this.props.github.tokenStatus === 'FAILED') {
      status = 'Invalid token!';
    }

    if (this.props.github.tokenStatus === 'NO_TOKEN') {
      open = false;
    }

    return (
      <div>
        <Snackbar open={open} message={status} onRequestClose={this.onClose} />
      </div>
    );
  }
}

export default Status;
