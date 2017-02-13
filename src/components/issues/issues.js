import React, { PropTypes } from 'react';
import _ from 'lodash';
import { inject } from 'mobx-react';
import NewIssueForm from './new-issue-form';

@inject('github')
class Issues extends React.Component {

  static get propTypes() {
    return {
      github: PropTypes.object.isRequired,
    };
  }

  render = () => (
    <div>
      {
        _.map(this.props.github.issue.issues, issue => <li>{issue.title}</li>)
      }
      <NewIssueForm />
    </div>
  )
}

export default Issues;
