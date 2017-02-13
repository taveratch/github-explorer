import React, { PropTypes } from 'react';
import { inject, observer } from 'mobx-react';
import Loading from './loading';
import Issues from './issues';

@inject('app', 'github')
@observer
class IssuesWrapper extends React.Component {

  static get propTypes() {
    return {
      app: PropTypes.object.isRequired,
      github: PropTypes.object.isRequired,
    };
  }

  render = () => {
    const className = this.props.app.showIssuePage ? 'issues-wrapper-show' : '';
    return (
      <div className={`issues-wrapper ${className}`}>
        <div className={'container'}>
          {
            this.props.github.issue.isLoading ?
              <Loading /> :
              <Issues />
          }
        </div>
      </div>
    );
  }
}

export default IssuesWrapper;
