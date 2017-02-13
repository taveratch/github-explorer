import React, { PropTypes } from 'react';
import { FormControl, Button } from 'react-bootstrap';
import { inject } from 'mobx-react';

@inject('github')
class RepoForm extends React.Component {

  static get propTypes() {
    return {
      github: PropTypes.object.isRequired,
    };
  }

  state = {
    repo: '',
  }

  onClick = () => {
    this.props.github
      .fetchRepositories(this.state.repo);
  }

  handleChange = (e) => {
    this.setState({ repo: e.target.value });
  }

  render = () => (
    <div className="card">
      <div className="card-content flex">
        <FormControl onChange={this.handleChange} className="margin-right" />
        <Button onClick={this.onClick}>Fetch</Button>
      </div>
    </div>
  )
}

export default RepoForm;
