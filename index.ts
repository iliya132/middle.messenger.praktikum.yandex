import { ChatsPage } from './src/pages/chatsPage/Chats';
import { FormEvents } from './src/utils/constants';
import RegisterPartials from './src/components/RegisterPartials';
import LoginPage, { LoginEvents } from './src/pages/login/login';
import RegisterPage, { RegisterEvents } from './src/pages/register/register';
import { chatPageTestProps } from './src/utils/testData';
import { AccountEvents } from './src/types/Types';

// simple routing for demo purposes only

function clearView() {
  document.body.innerHTML = '';
}

function renderLoginPage() {
  clearView();
  const loginPage = new LoginPage(document.body);
  loginPage.eventBus().on(LoginEvents.SignUp, () => {
    renderRegisterPage();
  });
  loginPage.eventBus().on(FormEvents.Submit, () => renderChatPage());
}

function renderRegisterPage() {
  clearView();
  const registerPage = new RegisterPage(document.body);
  registerPage.eventBus().on(RegisterEvents.Login, () => {
    renderLoginPage();
  });
  registerPage.eventBus().on(FormEvents.Submit, () => renderChatPage());
}

function renderChatPage() {
  clearView();
  const chatPage = new ChatsPage(document.body, chatPageTestProps);
  chatPage.eventBus().on(AccountEvents.Logout, ()=>{
      renderLoginPage();
  });
}

RegisterPartials();
renderLoginPage();
