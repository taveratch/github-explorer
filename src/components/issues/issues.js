import React, { PropTypes } from 'react';
import _ from 'lodash';
import { inject } from 'mobx-react';
import { List, Subheader, FlatButton, Divider } from 'material-ui';
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
      <List>
        <Subheader>Issues</Subheader>
        {
          _.map(this.props.github.issue.issues, issue => (
            <div>
              <FlatButton className={'issue-container'} >
                <div className="issue-title">{issue.title}</div>
                <div className="issue-body">{issue.body}</div>
              </FlatButton>
              <Divider />
            </div>
          ))
        }
      </List>
      <NewIssueForm />
    </div>
  )
}

export default Issues;
