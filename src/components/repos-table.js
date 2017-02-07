import React, { PropTypes } from 'react';
import { inject } from 'mobx-react';
import { Table } from 'react-bootstrap';
import _ from 'lodash';

@inject('github')
class ReposTable extends React.Component {

  static get propTypes() {
    return {
      github: PropTypes.objecit.isRequired,
    };
  }

  render = () => (
    <Table responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>Username</th>
          <th>Repository</th>
          <th>Open issues</th>
          <th>Code</th>
          <th>Download</th>
        </tr>
      </thead>
      <tbody>
        {
          _.each(this.props.github.repos, (repo, i) => (
            <tr>
              <td>{i + 1}</td>
              <td>{repo.username}</td>
              <td>{repo.data.name}</td>
              <td>{repo.data.open_issues}</td>
              <td><a href={repo.data.html_url}>github</a></td>
            </tr>
            ))
        }
      </tbody>
    </Table>
    )
}

export default ReposTable;
