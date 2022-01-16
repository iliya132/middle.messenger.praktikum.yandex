import { ChatsPage, defaultChatsState } from './src/pages/chatsPage/Chats';
import RegisterPartials from './src/components/RegisterPartials';
import LoginPage, { loginDefaultProps } from './src/pages/login/login';
import RegisterPage, { defaultSignUpUser } from './src/pages/register/register';
import Route from './src/utils/route';
import EditProfilePage from './src/pages/editProfile/EditProfile';
import Router from './src/utils/router';
import { store } from './src/store';
import { defaultProfileProps } from './src/utils/constants';

const rootElement = document.getElementById("root");

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

  Router.getInstance()
    .use(loginRoute)
    .use(registerRoute)
    .use(chatRoute)
    .use(settingsRoute)
    .start();
}
