import { observable, action } from 'mobx';

class Loader {
  @observable message = '';
  @observable isLoading;

  @action
  setMessage = (message) => {
    this.message = message;
  }

  @action
  showLoader = (isLoading) => {
    this.isLoading = isLoading;
  }
}

export default Loader;
