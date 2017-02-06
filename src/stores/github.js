import { action, observable } from 'mobx';
import request from 'superagent';
import _ from 'lodash';

class Github {

  @observable repos = [];
  @observable token = null;
  @observable users = [];
  @observable progress = 0;

  @action
  setToken = (token) => { this.token = token; }

  @action
  setGithubUsers = (users) => { this.users = users; }

  @action
  fetchRepositories = (repo) => {
    _.map(this.users, (user) => {
      request
        .get(`https://api.github.com/repos/${user}/${repo}`)
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
  isLoading = () => this.progress !== 100

}

export default Github;
