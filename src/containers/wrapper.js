import React, { PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import Token from './token';

@inject('github')
@observer
class Wrapper extends React.Component {
  static get propTypes() {
    return {
      github: PropTypes.object.isRequired,
    };
  }

  onClick = () => {}

  render = () => (
    <div>
      {
        !this.props.github.hasToken ?
          <Token /> :
          <div />
      }
    </div>
    )
}
export default Wrapper;
