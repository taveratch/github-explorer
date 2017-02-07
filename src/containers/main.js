import React from 'react';
import RepoForm from '../components/repo-form';
import UploadForm from '../components/upload-form';
import ReposTable from '../components/repos-table';

class Main extends React.Component {
  render = () => (
    <div>
      <UploadForm />
      <RepoForm />
      <ReposTable />
    </div>
    )
}

export default Main;
