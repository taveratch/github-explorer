import cookie from 'js-cookie';

const CookieToken = {
  saveToken: (token) => {
    cookie.set('token', token);
  },

  getToken: () => cookie.get('token'),
};

export default CookieToken;
