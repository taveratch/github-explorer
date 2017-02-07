import React, { PropTypes } from 'react';
import { inject, observer } from 'mobx-react';
import { Table, Button, Label } from 'react-bootstrap';
import _ from 'lodash';

@inject('github')
@observer
class ReposTable extends React.Component {

  static get propTypes() {
    return {
      github: PropTypes.object.isRequired,
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
              _.map(this.props.github.getRepos().slice(), (repo, i) => {
                if (repo.data.message) {
                  return (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td><a target="_blank" rel="noopener noreferrer" href={`http://github.com/${repo.username}`}>{repo.username}</a></td>
                      <td><Label bsStyle="danger">Not found</Label></td>
                      <td />
                      <td />
                      <td />
                    </tr>
                  );
                }
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td><a target="_blank" rel="noopener noreferrer" href={`http://github.com/${repo.username}`}>{repo.username}</a></td>
                    <td>{repo.data.name}</td>
                    <td>{repo.data.open_issues}</td>
                    <td><a target="_blank" rel="noopener noreferrer" href={repo.data.html_url}>github</a></td>
                    <td>
                      <Button>
                        <a
                          href={`https://codeload.github.com/${repo.username}/${repo.data.name}/zip/${repo.data.default_branch}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          download={`${repo.username}-${repo.data.name}-${repo.data.default_branch}`}
                        >Download</a>
                      </Button></td>
                  </tr>
                );
              })
            }
      </tbody>
    </Table>
    )
}

export default ReposTable;
