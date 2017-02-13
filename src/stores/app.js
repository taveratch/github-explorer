import { observable, action } from 'mobx';

class App {
  @observable showIssuePage = false;

  @action
  openIssuePage = () => {
    this.showIssuePage = true;
  }
}


export default App;
