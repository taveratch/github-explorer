import React from 'react';
import { ProgressBar } from 'react-bootstrap';

class Loading extends React.Component {

  style = {
    width: '100%',
    height: '100%',
  }

  render = () => (
    <div style={this.style} className="flex center-y center-x">
      <ProgressBar active now={100} />
    </div>
  )
}

export default Loading;
