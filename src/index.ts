import { ChatsPage, defaultChatsState } from './pages/chatsPage/Chats';
import RegisterPartials from './components/RegisterPartials';
import LoginPage, { loginDefaultProps } from './pages/login/login';
import RegisterPage, { defaultSignUpUser } from './pages/register/register';
import Route from './utils/route';
import EditProfilePage from './pages/editProfile/EditProfile';
import Router from './utils/router';
import { store } from './store/index';
import { defaultProfileProps } from './utils/constants';
import { NotFoundPage } from './pages/404/404';
import './pages/site.css';

const rootElement = document.getElementById("root") as HTMLElement;
if (rootElement === null){
  throw new Error('cannot obtain root container');
}

RegisterPartials();
configureRoute();


function configureRoute() {
  const loginRoute = new Route("/", () =>
    store.connect(new LoginPage(rootElement, loginDefaultProps)));

  const registerRoute = new Route("/sign-up", () =>
    store.connect(new RegisterPage(rootElement, defaultSignUpUser)));

  const chatRoute = new Route("/messenger", () =>
    store.connect(new ChatsPage(rootElement, defaultChatsState)));

  const settingsRoute = new Route("/settings", () =>
    store.connect(new EditProfilePage(rootElement, defaultProfileProps)));

  const notFoundRoute = new Route("*", () => new NotFoundPage({error: ''}, rootElement));

  Router.getInstance()
    .use(loginRoute)
    .use(registerRoute)
    .use(chatRoute)
    .use(settingsRoute)
    .useDefault(notFoundRoute)
    .start();
}
