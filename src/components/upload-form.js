import React, { PropTypes } from 'react';
import { inject } from 'mobx-react';
import { Card, CardText } from 'material-ui/Card';
import { FlatButton, Subheader } from 'material-ui';

@inject('github')
class UploadForm extends React.Component {

  static get propTypes() {
    return {
      github: PropTypes.object.isRequired,
    };
  }

  state = {
    style: {
      display: 'none',
    },
    fileName: '',
  };

  file = {};

  handleChange = (e) => {
    this.file = e.target.files[0];
    this.setState({ fileName: this.file.name });
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
  }

  render = () => (
    <Card>
      <Subheader>Upload user list</Subheader>
      <CardText>
        <div className="flex flex-column">
          <FlatButton containerElement="label" label="Choose file">
            <input type="file" onChange={this.handleChange} style={this.state.style} />
          </FlatButton>
          <p>{this.file.name || ''}</p>
        </div>
      </CardText>
    </Card>
    )
}

export default UploadForm;
