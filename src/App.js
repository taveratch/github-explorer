import React, { Component } from 'react';
import { Provider, observer } from 'mobx-react';
import github from './stores/github';

@observer
class App extends Component {

  onChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    const reader = new FileReader();
    reader.onload = function () {
      console.log(reader.result.trim().split('\n'));
    };
    reader.readAsText(file);
  }

  upload = () => {
    console.log(this.uploadFile.ref);
  }

  store = {
    github,
  }


  render() {
    return (
      <Provider {...this.store} >
        <div>
          <input type="file" ref={(ref) => { this.uploadFile = ref; }} onChange={this.onChange} />
          <button onClick={this.upload}>Uploads</button>
        </div>
      </Provider>
    );
  }
}

export default App;
