import React, { PropTypes } from 'react';
import { Label } from 'react-bootstrap';
import { inject, observer } from 'mobx-react';

@inject('github')
@observer
class Status extends React.Component {

  static get propTypes() {
    return {
      github: PropTypes.object.isRequired,
    };
  }

  empty = () => {}

  render = () => {
    let status = 'Checking token...';
    let style = 'warning';
    if (this.props.github.tokenStatus === 'FAILED') {
      status = 'Invalid token!';
      style = 'danger';
    }

    if (this.props.github.tokenStatus === 'NO_TOKEN') {
      return <div />;
    }

    return (
      <div>
        <Label bsStyle={style}>{status}</Label>
      </div>
    );
  }
}

export default Status;
