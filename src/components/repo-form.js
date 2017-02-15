import React, { PropTypes } from 'react';
import { FormControl, Button, Panel } from 'react-bootstrap';
import { inject } from 'mobx-react';

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
    <Panel>
      <div className="flex">
        <FormControl onChange={this.handleChange} className="margin-right" />
        <Button onClick={this.onClick}>Load repositories</Button>
      </div>
    </Panel>
  )
}

export default RepoForm;
