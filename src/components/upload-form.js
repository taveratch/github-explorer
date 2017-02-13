import React, { PropTypes } from 'react';
import { inject } from 'mobx-react';

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
  };

  file = {};

  handleChange = (e) => {
    this.file = e.target.files[0];
    this.upload();
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
    <div className="card">
      <div className="card-content">
        <form action="#" className="no-margin">
          <div className="file-field input-field no-margin">
            <div className="btn">
              <input type="file" onChange={this.handleChange} />
              <span>File</span>
            </div>
            <div className="file-path-wrapper">
              <input className="file-path validate" type="text" value={this.file.name} placeholder="Choose file to upload (.csv)" />
            </div>
          </div>
        </form>
      </div>
    </div>
    )
}

export default UploadForm;
