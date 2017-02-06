import { observable, computed, action } from 'mobx';

export default class Store {
  @observable firstname = 'Omen'
  @observable lastname = 'Adam'
  @computed get name() {
    return `${this.firstname} ${this.lastname}`;
  }
  @action.bound
  setFirstname(firstname) {
    this.firstname = firstname;
  }

  @action.bound
  setLastname(lastname) {
    this.lastname = lastname;
  }

}
