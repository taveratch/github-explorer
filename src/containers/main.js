import React from 'react';
import RepoForm from '../components/repo-form';
import UploadForm from '../components/upload-form';

class Main extends React.Component {
  render = () => (
    <div>
      <UploadForm />
      <RepoForm />
    </div>
    )
}

export default Main;
