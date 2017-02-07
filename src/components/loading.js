import React, { PropTypes } from 'react';
import { ProgressBar } from 'react-bootstrap';
import { inject, observer } from 'mobx-react';

@inject('github')
@observer
class Loading extends React.Component {

  static get propTypes() {
    return {
      github: PropTypes.object.isRequired,
    };
  }

  render = () => (
    <div>
      <ProgressBar active now={this.props.github.progress} label={`${this.props.github.progress}%`} />
    </div>
  )
}

export default Loading;
