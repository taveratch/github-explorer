import { observable, action } from 'mobx';

class App {
  @observable showIssuePage = false;
  @observable blur = false;

  @action
  toggleIssuesPage = () => {
    this.showIssuePage = !this.showIssuePage;
  }

  @action
  toggleBlur = () => {
    this.blur = !this.blur;
  }
}


export default App;
