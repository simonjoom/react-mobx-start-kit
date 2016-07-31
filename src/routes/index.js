

// Child routes
import home from './home';
import mHome from './home/Home';
import contact from './contact';
import Root from './root';
import login from './login';
import register from './register';
import content from './content';
import error from './error';

export default [
    home,
    Root,
    contact,
    login,
    register,
    content,
    error


 /* async action({render,next,context}) {
    const component = await next();
    if (component === undefined) return component;

    return render(
      <Provider context={context}>
      <AppContainer>
    <App children={component}/>
    </AppContainer>
      </Provider>
    );
  },*/
];
