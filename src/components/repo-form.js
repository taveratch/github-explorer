import React, { PropTypes } from 'react';
import { inject } from 'mobx-react';
import { Card, CardText } from 'material-ui/Card';
import { TextField, RaisedButton, Subheader } from 'material-ui';

@inject('github', 'loader')
class RepoForm extends React.Component {

  static get propTypes() {
    return {
      github: PropTypes.object.isRequired,
      loader: PropTypes.object.isRequired,
    };
  }

  state = {
    repo: '',
  }

  onClick = () => {
    const callback = () => { this.props.loader.showLoader(false); };
    this.props.github
      .fetchRepositories(this.state.repo, this.props.loader.setMessage, callback);
    this.props.loader
      .showLoader(true);
  }

  handleChange = (e) => {
    this.setState({ repo: e.target.value });
  }

  render = () => (
    <Card>
      <Subheader>Repository</Subheader>
      <CardText>
        <div className="flex center-y">
          <TextField hintText={'Repository name'} className={'margin-right'} style={{ flexGrow: 2 }} onChange={this.handleChange} />
          {/* <FormControl  className="margin-right" /> */}
          <RaisedButton primary label={'Load'} onClick={this.onClick} />
        </div>
      </CardText>
    </Card>
  )
}

export default RepoForm;
