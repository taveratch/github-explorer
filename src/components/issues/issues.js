import React, { PropTypes } from 'react';
import _ from 'lodash';
import { inject } from 'mobx-react';
import { List, Subheader, Divider } from 'material-ui';
import ReactMarkdown from 'react-markdown';
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
              <div className={'issue-container'} >
                <div className="issue-title"><b>{issue.title}</b></div>
                <ReactMarkdown source={issue.body} />
              </div>
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
