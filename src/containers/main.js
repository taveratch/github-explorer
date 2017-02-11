import React, { PropTypes } from 'react';
import { inject, observer } from 'mobx-react';
import { Col, Row } from 'react-bootstrap';
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
      <Row>
        <Col xs={12} sm={6} md={6} lg={6}>
          <UploadForm />
        </Col>
        <Col xs={12} sm={6} md={6} lg={6}>
          <RepoForm />
        </Col>
      </Row>
      {
            this.props.github.isLoading ?
              <Loading /> :
              <ReposTable />
          }
    </div>
    )
}

export default Main;
