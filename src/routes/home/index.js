
import Home from './Home';
import fetch from '../../core/fetch';
import _debug from 'debug'
const debug = _debug('app:server')

export default {

  path: '/',

  async action() {
  /*  const resp = await fetch('/graphql', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: '{news{title,link,contentSnippet}}',
      }),
      credentials: 'include',
    });
    const { data } = await resp.json();

    if (!data || !data.news) throw new Error('Failed to load the news feed.');*/
   /* debug('fetching...');
    function sleep(ms = 0) {
  return new Promise(r => setTimeout(r, ms));
}
    await sleep(1000);*/

    const title="home";
    const { data } = await {data:{
    news:[{title:'testzdzdz',link:'tesztz',contentSnippet:'test'},
    {title:'tezdzstz',link:'test',contentSnippet:'test'}]
    }};
    return { title: title, component: Home, props:data };
  //  return <Home news={data.news} />;
  },

};
