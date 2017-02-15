import { observable, action } from 'mobx';

class App {
  @observable showIssuePage = false;
  @observable blur = false;

  @action
  openIssuePage = () => {
    this.showIssuePage = true;
  }

  @action
  toggleBlur = () => {
    this.blur = !this.blur;
  }
}


export default App;
