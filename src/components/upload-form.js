import React, { PropTypes } from 'react';
import { inject } from 'mobx-react';
import { Button, Panel } from 'react-bootstrap';

@inject('github')
class UploadForm extends React.Component {

  static get propTypes() {
    return {
      github: PropTypes.object.isRequired,
    };
  }

  state = {
    style: {
      color: 'initial',
    },
  }

  handleChange = (e) => {
    this.file = e.target.files[0];
  }

  upload = () => {
    const reader = new FileReader();
    const self = this;
    reader.onload = function () {
      self.props.github
        .setGithubUsers(reader.result);
    };
    reader.readAsText(this.file);
    this.setState({ style: { color: 'green' } });
  }

  render = () => (
    <Panel>
      <div className="flex center-y" style={{ justifyContent: 'flex-end' }}>
        <div>
          <input type="file" onChange={this.handleChange} style={this.state.style} />
          {/* <span>{this.state.status}</span> */}
        </div>
        <Button onClick={this.upload}>Upload</Button>
      </div>
    </Panel>
    )
}

export default UploadForm;
