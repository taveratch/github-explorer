import React, { PropTypes } from 'react';
// import { ProgressBar } from 'react-bootstrap';
import { inject, observer } from 'mobx-react';

@inject('loader')
@observer
class Loading extends React.Component {

  static get propTypes() {
    return {
      loader: PropTypes.object.isRequired,
    };
  }

  renderLoader = () => (
    <div className="loading-wrapper">
      <div className="loading-bg" />
      <div className="loading-body">
        <div className="loader">{this.props.loader.message}</div>
      </div>
    </div>
    )

  render = () => (this.props.loader.isLoading ? this.renderLoader() : <div />)
}

export default Loading;
