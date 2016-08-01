import Login from './Login';

export default {

  path: '/login',

  action() {
  const title="Login";
  return { title: title, component: Login, props:{} };
  },

};
