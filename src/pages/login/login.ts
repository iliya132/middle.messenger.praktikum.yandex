import Block from '../../utils/block';
import { templateCompiled } from './login.tmpl.hbs';
import InputValidator, { InputValidatorConfiguration } from '../../utils/inputValidator';
import { LoginProps } from '../../types/Types';
import {
  AtLeastOneLetterAndLettersOrDigitsRegex, AtLeastOneLetterAndLettersOrDigitsRegexDescription, AtLeastOneUpperLetterAndOneDigit, AtLeastOneUpperLetterAndOneDigitDescription, FormEvents, loginPageProps as loginInputFields,
} from '../../utils/constants';
import Router from '../../utils/router';
import authController from '../../controllers/authController';
import chatController from '../../controllers/chatController';
import { RootState } from '../../utils/store';

export enum LoginEvents {
  SignUp = 'SIGN_UP'
}

export default class LoginPage extends Block<LoginProps> {

  constructor(root: HTMLElement, props: LoginProps) {
    super(props, root);
  }

  _passwordInput() {
    return this.getElement()?.querySelector('#passwordField') as HTMLInputElement;
  }

  _passwordValue() {
    return this._passwordInput().value;
  }

  _loginInput() {
    return this.getElement()?.querySelector('#loginField') as HTMLInputElement;
  }

  _loginValue() {
    return this._loginInput().value;
  }

  render() {
    const el = this.getElement();
    if (el) {
      const templateValues = { ...loginInputFields, error: this.props.error };
      el.innerHTML = templateCompiled(templateValues);
      this._enableValidation();
      this._addEvents();
    }
  }

  fetchData(): void {
    authController.getUser().then((response) => {
      if (!response.error) {
        Router.getInstance().go('/messenger');
      }
    });
  }

  _validators: {
    loginValidator: InputValidatorConfiguration | null,
    passwordValidator: InputValidatorConfiguration | null
  } = {
      loginValidator: null, passwordValidator: null,
    };

  _enableValidation() {
    const loginInput = this._loginInput();
    const passwordInput = this._passwordInput();
    const loginLabel = this.getElement()?.querySelector('label[for="loginField"]') as HTMLLabelElement;
    const passwordLabel = this.getElement()?.querySelector('label[for="passwordField"]') as HTMLLabelElement;

    this._validators.loginValidator = InputValidator.configure()
      .setErrorMessage(AtLeastOneLetterAndLettersOrDigitsRegexDescription)
      .setRegexpRule(AtLeastOneLetterAndLettersOrDigitsRegex)
      .minLen(3)
      .maxLen(15)
      .required()
      .printErrorToLabel(loginLabel)
      .attachToInput(loginInput);

    this._validators.passwordValidator = InputValidator.configure()
      .setRegexpRule(AtLeastOneUpperLetterAndOneDigit)
      .setErrorMessage(AtLeastOneUpperLetterAndOneDigitDescription)
      .minLen(8)
      .maxLen(40)
      .required()
      .printErrorToLabel(passwordLabel)
      .attachToInput(passwordInput);
  }

  stateToProps: (state: RootState) => LoginProps = (state) => ({ ...loginDefaultProps, isSignedIn: state.auth.isSignedIn, error: state.auth.error });

  _addEvents() {
    const loginForm = this.getElement()?.querySelector('form');
    const signUpLink = this.getElement()?.querySelector('#signUpLink');
    this.eventBus().on(FormEvents.Submit, () => this._handleSubmit());

    signUpLink?.addEventListener('click', () => {
      this.eventBus().emit(LoginEvents.SignUp);
    });
    loginForm?.addEventListener('submit', (event) => {
      if (this._validateForm()) {
        this.eventBus().emit(FormEvents.Submit);
      }
      event.preventDefault();
    });
  }

  _handleSubmit() {
    authController.signIn(this._loginValue(), this._passwordValue()).then(() => {
      chatController.featchChats();
      Router.getInstance().go('/messenger');
    }).catch((response) => {
      console.error('Error occurred while trying to login: ', response);
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected componentDidMount(): void { }

  _validateForm() {
    if (!this._validators.loginValidator || !this._validators.loginValidator.validate()) {
      return false;
    }
    if (!this._validators.passwordValidator || !this._validators.passwordValidator.validate()) {
      return false;
    }
    return true;
  }
}

export const loginDefaultProps: LoginProps = {
  login: '',
  password: '',
  isSignedIn: false,
  error: '',
};
