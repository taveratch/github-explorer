import { action, observable, computed } from 'mobx';
import request from 'superagent';
import _ from 'lodash';
import cookieToken from '../utils/cookie-token';

const ENDPOINT = 'https://api.github.com';
const CLIENT_ID = '141ecf805fa1444bc6c3';
const CLIENT_SECRET = '8b0ee975f5aa20ab4808ff4cbf023606c05a7ba2';

const GET = 'GET';

class Github {

  @observable repos = [];
  @observable token = null;
  @observable tokenStatus = 'NO_TOKEN';
  @observable users = [];
  @observable progress = 0;
  @observable count = 0;
  @observable issue = {
    isLoading: false,
    issues: {},
  }

  getRepos = () => (this.repos)

  @action
  setToken = (token) => {
    this.token = token;
    cookieToken.saveToken(token);
    this.validateToken(token);
  }

  @action
  setGithubUsers = (users) => {
    this.users = users.trim().split('\n');
  }

  @action
  fetchRepositories = (repo, setMessageCallback, successCallback) => {
    this.repos = [];
    this.progress = 0;
    this.count = 0;
    _.map(this.users, (user) => {
      request(GET, `${ENDPOINT}/repos/${user}/${repo}`)
        .set('Accept', 'application/vnd.github.inertia-preview+json')
        .set('Authorization', `token ${this.token}`)
        .end((err, res) => {
          this.update(setMessageCallback, successCallback);
          this.filterData(res, user);
        });
    });
  }

  update = (setMessageCallback, successCallback) => {
    this.count = this.count + 1;
    this.progress = Math.round((this.count / this.users.length) * 100);
    setMessageCallback(`${this.progress}%`);
    if (this.progress === 100) { successCallback(); }
  }

  filterData = (res, user) => {
    this.repos.push({
      username: user,
      data: res.body,
    });
  }

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

  @action
  auth = (code, state) => {
    const self = this;
    request
      .post('https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token')
      .set('Content-Type', 'multipart/form-data')
      .query({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        callback: 'http://127.0.0.1:3000/callback',
        code,
        state,
      })
      .end((err, res) => {
        const token = res.body.access_token;
        self.setToken(token);
        window.location = '/';
      });
  }

  @action
  checkToken = () => {
    const token = cookieToken.getToken();
    if (token) this.setToken(token);
  }

  @action
  fetchIssues = (username, repo) => {
    const self = this;
    this.issue.isLoading = true;
    request
      .get(`https://api.github.com/repos/${username}/${repo}/issues`)
      .end((err, res) => {
        console.log(res);
        self.issue.issues = res.body;
        self.issue.isLoading = false;
      });
  }
}

export default Github;
