import { action, observable, computed } from 'mobx';
import request from 'superagent';
import _ from 'lodash';

const ENDPOINT = 'https://api.github.com';

class Github {

  @observable repos = [];
  @observable token = null;
  @observable tokenStatus = 'NO_TOKEN';
  @observable users = [];
  @observable progress = 0;

  @action
  setToken = (token) => {
    this.token = token;
    this.validateToken(token);
  }

  @action
  setGithubUsers = (users) => { this.users = users; }

  @action
  fetchRepositories = (repo) => {
    _.map(this.users, (user) => {
      request
        .get(`${ENDPOINT}/repos/${user}/${repo}`)
        .set('Accept', 'application/vnd.github.inertia-preview+json')
        .set('Authorization', `token ${this.token}`)
        .end((res, err) => {
          this.update();
          this.filterData(res, err);
        });
    })
    .request
      .get('/');
  }

  update = () => {
    this.progress = ((this.progress + 1) / this.users.length) * 100;
  }

  filterData = (res, err) => {
    console.log(res);
    console.log(err);
  }

  @action
  isLoading = () => this.progress !== 100;

  @computed get hasToken() {
    return this.tokenStatus === 'SUCCESS';
  }

  validateToken = (token) => {
    this.tokenStatus = 'CHECKING';
    request
      .get(`${ENDPOINT}/user`)
      .set('Authorization', `token ${token}`)
      .end((res, err) => {
        if (err.status === 200) {
          this.tokenStatus = 'SUCCESS';
        } else {
          this.tokenStatus = 'FAILED';
        }
      });
  }
}

export default Github;
