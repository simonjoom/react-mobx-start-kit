import ErrorPage from './ErrorPage';

import App from '../../components/App';

export default {

  path: '/error',
/*
async action({ error }) {
console.log(error);
    const title="error";
    return { title: title, component: ErrorPage, props:error };
  //  return <Home news={data.news} />;
  },
   */
  action({  error }) {
  const title="error";
   return { title: title, component: ErrorPage, props:{error} };
   /*
    return render(
      <App context={context} error={error}>
        <ErrorPage error={error} />
      </App>,
      error.status || 500
    );*/
  },
};
