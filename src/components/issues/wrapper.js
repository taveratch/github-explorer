/* eslint no-unused-vars: 0*/
import React, { PropTypes } from 'react';
import { inject, observer } from 'mobx-react';
import $ from 'jquery';
import Loading from './loading';
import Issues from './issues';

@inject('issues', 'github')
@observer
class IssuesWrapper extends React.Component {

  static get propTypes() {
    return {
      issues: PropTypes.object.isRequired,
      github: PropTypes.object.isRequired,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const element = $('.issues-wrapper');
    setTimeout(() => {
      if (prevProps.issues.showIssuePage) {
        element.removeClass('issues-wrapper-close');
        element.addClass('issues-wrapper-open');
      } else {
        element.removeClass('issues-wrapper-open');
        element.addClass('issues-wrapper-close');
      }
    }, 100);
  }

  close = () => {
    const element = $('.issues-wrapper');
    element.removeClass('issues-wrapper-open');
    element.addClass('issues-wrapper-close');
    setTimeout(() => {
      this.props.issues
        .toggleIssuesPage();
    }, 1000);
  }

  renderIssuesWrapper = () => (
    <div className={'issues-wrapper'}>
      <div className={'container'}>
        <i onClick={this.close} className={'fa fa-times close-icon pointer'} aria-hidden={'true'} />
        {
            this.props.github.issue.isLoading ?
              <Loading /> :
              <Issues />
          }
      </div>
    </div>
  )

  render = () => (this.props.issues.showIssuePage ? this.renderIssuesWrapper() : <div />)

}

export default IssuesWrapper;
