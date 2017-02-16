import React, { PropTypes } from 'react';
import { inject } from 'mobx-react';
import { Card, CardText } from 'material-ui/Card';
import { FlatButton } from 'material-ui';

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
    <Card>
      <CardText>
        <div className="flex center-y" style={{ justifyContent: 'flex-end' }}>
          <div>
            <input type="file" onChange={this.handleChange} style={this.state.style} />
            {/* <span>{this.state.status}</span> */}
          </div>
          <FlatButton
            label="Upload"
            labelPosition="before"
            onTouchTap={this.upload}
            // icon={<FontIcon className="material-icons">home</FontIcon>}
          />
        </div>
      </CardText>
    </Card>
    )
}

export default UploadForm;
