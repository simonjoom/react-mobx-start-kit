import { PropTypes } from 'react';
//import withStyles from 'isomorphic-style-loader/lib/withStyles';
//import Errorstyle from './ErrorPage.css';

export function ErrorPage({ error }, context) {
  let title = 'Error';
  let content = 'Sorry, a critical error occurred on this page.';
  let errorMessage = null;

  if (error.status === 404) {
    title = 'Page Not Found';
    content = 'Sorry, the page you were trying to view does not exist.';
  } else if (process.env.NODE_ENV !== 'production') {
    errorMessage = <pre>{error.stack}</pre>;
  }

  if (context.setTitle) {
    context.setTitle(title);
  }

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
      {errorMessage}
    </div>
  );
}

ErrorPage.propTypes = { error: PropTypes.object.isRequired };
ErrorPage.contextTypes = { setTitle: PropTypes.func.isRequired };

export default  ErrorPage;
