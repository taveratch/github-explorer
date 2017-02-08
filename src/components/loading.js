import React, { PropTypes } from 'react';
// import { ProgressBar } from 'react-bootstrap';
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
    <div className="loading-wrapper">
      <div className="loading-bg">
        { /* <ProgressBar
          active now={this.props.github.progress} label={`${this.props.github.progress}%`} /> */ }
      </div>
      <div className="loading-body">
        <div className="loader">{`${this.props.github.progress}%`}</div>
      </div>
    </div>
  )
}

export default Loading;
