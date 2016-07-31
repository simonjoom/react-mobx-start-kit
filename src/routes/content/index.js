import Content from './Content';
import fetch from '../../core/fetch';

export default {

  path: '*',

  async action({ path }) { // eslint-disable-line react/prop-types
    /*const resp = await fetch('/graphql', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `{content(path:"${path}"){path,title,content,component}}`,
      }),
      credentials: 'include',
    });
    if (resp.status !== 200) throw new Error(resp.statusText);
    const { data } = await resp.json();
    if (!data || !data.content) return undefined;*/
    let title=null;
    const data = await {data:{content:"ldflzdzdzezjfnzovzoeiv"}}
    return { title: title, component: Content, props:data };
  },

};
