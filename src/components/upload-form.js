import React, { PropTypes } from 'react';
import { inject } from 'mobx-react';
import { Button } from 'react-bootstrap';

@inject('github')
class UploadForm extends React.Component {

  static get propTypes() {
    return {
      github: PropTypes.object.isRequired,
    };
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
  }

  render = () => (
    <div>
      <input type="file" onChange={this.handleChange} />
      <Button onClick={this.upload}>Upload</Button>
    </div>
    )
}

export default UploadForm;
