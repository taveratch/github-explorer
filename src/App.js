import React, { PropTypes } from 'react';
import { inject, observer } from 'mobx-react';
import Token from './containers/token';
import Main from './containers/main';
import BlurContainer from './components/blur-container';
import Loading from './components/loading';

@inject('github', 'loader')
@observer
class App extends React.Component {

  static get propTypes() {
    return {
      github: PropTypes.object.isRequired,
      children: PropTypes.element.isRequired,
      loader: PropTypes.object.isRequired,
    };
  }

  componentDidMount() {
    this.props.github.checkToken();
  }

  render = () => (

    <div className="container">
      <BlurContainer blur={this.props.loader.isLoading}>
        {
            !this.props.github.hasToken ?
              <Token /> :
              <Main />
        }
        {
          this.props.children
        }
      </BlurContainer>
      <Loading />
    </div>
  )
}

export default App;
