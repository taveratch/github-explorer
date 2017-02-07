import React, { PropTypes } from 'react';
import { inject, observer } from 'mobx-react';
import RepoForm from '../components/repo-form';
import UploadForm from '../components/upload-form';
import ReposTable from '../components/repos-table';
import Loading from '../components/loading';

@inject('github')
@observer
class Main extends React.Component {

  static get propTypes() {
    return {
      github: PropTypes.object.isRequired,
    };
  }

  render = () => (
    <div>
      <UploadForm />
      <RepoForm />
      {
        this.props.github.isLoading ?
          <Loading /> :
          <ReposTable />
      }
    </div>
    )
}

export default Main;
