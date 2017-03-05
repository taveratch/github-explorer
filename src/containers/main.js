import React, { PropTypes } from 'react';
import { inject, observer } from 'mobx-react';
import { Row, Col } from 'react-bootstrap';
import RepoForm from '../components/repo-form';
import UploadForm from '../components/upload-form';
import ReposTable from '../components/repos-table';
import Loading from '../components/loading';
import IssuesWrapper from '../components/issues/wrapper';


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
      <Row className={'main-top-menu-wrapper'}>
        <Col xs={12} sm={12} md={6} lg={6} className={'main-top-menu-each'}>
          <div style={{ width: '100%' }}><UploadForm /></div>
        </Col>
        <Col xs={12} sm={12} md={6} lg={6} className={'main-top-menu-each'}>
          <div style={{ width: '100%' }}><RepoForm /></div>
        </Col>
      </Row>
      {
            this.props.github.isLoading ?
              <Loading /> :
              <ReposTable />
      }
      <IssuesWrapper />
    </div>
    )
}

export default Main;
