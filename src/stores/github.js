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

  getRepos = () => (this.repos)

  @action
  setToken = (token) => {
    this.token = token;
    this.validateToken(token);
  }

  @action
  setGithubUsers = (users) => {
    this.users = users.trim().split('\n');
  }

  @action
  fetchRepositories = (repo) => {
    this.repos = [];
    _.map(this.users, (user) => {
      request
        .get(`${ENDPOINT}/repos/${user}/${repo}`)
        .set('Accept', 'application/vnd.github.inertia-preview+json')
        .set('Authorization', `token ${this.token}`)
        .end((err, res) => {
          this.update();
          this.filterData(res, user);
        });
    });
  }

  update = () => {
    this.progress = ((this.progress + 1) / this.users.length) * 100;
  }

  filterData = (res, user) => {
    this.repos.push({
      username: user,
      data: res.body,
    });
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

  validateRepo = repo => repo.trim().split('\n')
}

export default Github;
