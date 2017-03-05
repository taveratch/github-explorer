import React, { PropTypes } from 'react';
import { inject, observer } from 'mobx-react';
import { Button, Label } from 'react-bootstrap';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import _ from 'lodash';

@inject('github', 'issues')
@observer
class ReposTable extends React.Component {

  static get propTypes() {
    return {
      github: PropTypes.object.isRequired,
      issues: PropTypes.object.isRequired,
    };
  }

  onRowSelection = (row) => {
    if (!row || row.length === 0) return;
    const data = this.props.github.getRepos().slice()[row[0]];
    const username = data.username;
    const repo = data.data.name;
    this.props.github
      .fetchIssues(username, repo);
    this.props.issues
      .toggleIssuesPage();
  }

  render = () => (
    <Table onRowSelection={this.onRowSelection}>
      <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
        <TableRow>
          <TableHeaderColumn>#</TableHeaderColumn>
          <TableHeaderColumn>Username</TableHeaderColumn>
          <TableHeaderColumn>Repository</TableHeaderColumn>
          <TableHeaderColumn>Open issues</TableHeaderColumn>
          <TableHeaderColumn>Code</TableHeaderColumn>
          <TableHeaderColumn>Download</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody displayRowCheckbox={false}>
        {
                _.map(this.props.github.getRepos().slice(), (repo, i) => {
                  if (repo.data.message) {
                    return (
                      <TableRow adjustForCheckbox={false} key={i}>
                        <TableRowColumn>{i + 1}</TableRowColumn>
                        <TableRowColumn><a target="_blank" rel="noopener noreferrer" href={`http://github.com/${repo.username}`}>{repo.username}</a></TableRowColumn>
                        <TableRowColumn><Label bsStyle="danger">Not found</Label></TableRowColumn>
                        <TableRowColumn />
                        <TableRowColumn />
                        <TableRowColumn />
                      </TableRow>
                    );
                  }
                  return (
                    <TableRow key={i} >
                      <TableRowColumn>{i + 1}</TableRowColumn>
                      <TableRowColumn><a target="_blank" rel="noopener noreferrer" href={`http://github.com/${repo.username}`}>{repo.username}</a></TableRowColumn>
                      <TableRowColumn>{repo.data.name}</TableRowColumn>
                      <TableRowColumn>{repo.data.open_issues}</TableRowColumn>
                      <TableRowColumn><a target="_blank" rel="noopener noreferrer" href={repo.data.html_url}>github</a></TableRowColumn>
                      <TableRowColumn>
                        <Button>
                          <a
                            href={`https://codeload.github.com/${repo.username}/${repo.data.name}/zip/${repo.data.default_branch}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            download={`${repo.username}-${repo.data.name}-${repo.data.default_branch}`}
                          >Download</a>
                        </Button></TableRowColumn>
                    </TableRow>
                  );
                })
              }
      </TableBody>
    </Table>
    )
}

export default ReposTable;
