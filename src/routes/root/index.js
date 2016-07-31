
import Root from './Root';

export default {

  path: '/root',

 action() {
    return { title: 'sas', component: Root, props:{} };
  //  return <Home news={data.news} />;
  }

};
