import React, { PropTypes } from 'react';
import { FormControl, Button } from 'react-bootstrap';
import { inject } from 'mobx-react';
import { Card, CardText } from 'material-ui/Card';

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
      <CardText>
        <div className="flex">
          <FormControl onChange={this.handleChange} className="margin-right" />
          <Button onClick={this.onClick}>Load repositories</Button>
        </div>
      </CardText>
    </Card>
  )
}

export default RepoForm;
