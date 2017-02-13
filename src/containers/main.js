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
      <div className="row">
        <div className="col s12 m6 l6">
          <UploadForm />
        </div>
        <div className="col s12 m6 l6">
          <RepoForm />
        </div>
      </div>
      {
            this.props.github.isLoading ?
              <Loading /> :
              <ReposTable />
          }
    </div>
    )
}

export default Main;
