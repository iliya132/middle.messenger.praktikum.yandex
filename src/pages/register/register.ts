import IUser, { SignupProps } from '../../types/Types';
import Block from '../../utils/block';
import {
  AtLeastOneLetterAndLettersOrDigitsRegex, AtLeastOneLetterAndLettersOrDigitsRegexDescription, AtLeastOneUpperLetterAndOneDigit, AtLeastOneUpperLetterAndOneDigitDescription, EmailRegex, EmailRegexDescription, FormEvents, OnlyLettersRegex, PhoneRegex, PhoneRegexDescription, registerPageParams,
} from '../../utils/constants';
import templateCompiled from './register.handlebars';
import InputValidator, { InputValidatorConfiguration } from '../../utils/inputValidator';
import authController from '../../controllers/authController';
import Router from '../../utils/router';
import { RootState } from '../../utils/store';

export enum RegisterEvents {
  Login = 'LOGIN'
}

export default class RegisterPage extends Block<SignupProps> {
  constructor(root: HTMLElement, props: SignupProps) {
    super(props, root);
  }

  override componentDidMount(): void {
    if (this.props.isSignedIn) {
      Router.getInstance().go('/messenger');
    }
  }

  render() {
    const root = this.getElement();

    if (root) {
      root.innerHTML = templateCompiled(registerPageParams);
      this.enableValidation();
      this.addEvents();
    }
    this.dispatchComponentDidMount();
  }

  validators: InputValidatorConfiguration[] = [];

  getInput(name: string) {
    return this.getElement()?.querySelector(`#${name}Field`) as HTMLInputElement;
  }

  getLabel(input: HTMLInputElement) {
    return this.getElement()?.querySelector(`label[for="${input?.id}"]`) as HTMLLabelElement;
  }

  stateToProps: (state: RootState) => SignupProps = (state) => ({ ...defaultSignUpUser, isSignedIn: state.auth.isSignedIn });

  data(): IUser {
    return {
      firstName: this.getInput('firstName').value,
      secondName: this.getInput('secondName').value,
      login: this.getInput('login').value,
      email: this.getInput('email').value,
      password: this.getInput('password').value,
      phone: this.getInput('phone').value,
      avatar: '',
      displayName: this.getInput('secondName').value + ' ' + this.getInput('firstName').value,
      id: 0
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public fetchData() { }

  enableValidation() {
    const firstNameInput = this.getInput('firstName');
    const secondNameInput = this.getInput('secondName');
    const loginInput = this.getInput('login');
    const emailInput = this.getInput('email');
    const passwordInput = this.getInput('password');
    const phoneInput = this.getInput('phone');

    // #region configure validation rules
    const firstNameValidator = InputValidator.configure()
      .setRegexpRule(OnlyLettersRegex)
      .required()
      .printErrorToLabel(this.getLabel(firstNameInput))
      .attachToInput(firstNameInput);
    this.validators.push(firstNameValidator);

    const secondNameValidator = InputValidator.configure()
      .setRegexpRule(OnlyLettersRegex)
      .required()
      .printErrorToLabel(this.getLabel(secondNameInput))
      .attachToInput(secondNameInput);
    this.validators.push(secondNameValidator);

    const loginValidator = InputValidator.configure()
      .setErrorMessage(AtLeastOneLetterAndLettersOrDigitsRegexDescription)
      .setRegexpRule(AtLeastOneLetterAndLettersOrDigitsRegex)
      .minLen(3)
      .maxLen(20)
      .required()
      .printErrorToLabel(this.getLabel(loginInput))
      .attachToInput(loginInput);
    this.validators.push(loginValidator);

    const emailValidator = InputValidator.configure()
      .setErrorMessage(EmailRegexDescription)
      .setRegexpRule(EmailRegex)
      .required()
      .printErrorToLabel(this.getLabel(emailInput))
      .attachToInput(emailInput);
    this.validators.push(emailValidator);

    const passwordValidator = InputValidator.configure()
      .setRegexpRule(AtLeastOneUpperLetterAndOneDigit)
      .setErrorMessage(AtLeastOneUpperLetterAndOneDigitDescription)
      .minLen(8)
      .maxLen(40)
      .required()
      .printErrorToLabel(this.getLabel(passwordInput))
      .attachToInput(passwordInput);
    this.validators.push(passwordValidator);

    const phoneValidator = InputValidator.configure()
      .setErrorMessage(PhoneRegexDescription)
      .setRegexpRule(PhoneRegex)
      .required()
      .printErrorToLabel(this.getLabel(phoneInput))
      .attachToInput(phoneInput);
    this.validators.push(phoneValidator);
    // #endregion
  }

  addEvents() {
    const loginLink = this.getElement()?.querySelector('#Login');
    const signUpForm = this.getElement()?.querySelector('form');
    this.eventBus().on(FormEvents.Submit, () => this.handleSubmit());

    loginLink?.addEventListener('click', () => this.eventBus().emit(RegisterEvents.Login));
    signUpForm?.addEventListener('submit', (event) => {
      if (!this.validateForm()) {
        console.log('Submit prevented, cause of invalid data!');
      } else {
        this.eventBus().emit(FormEvents.Submit);
      }
      event.preventDefault();
    });
  }

  private handleSubmit() {
    authController.signUp(this.data());
  }

  validateForm() {
    for (const rule of this.validators) {
      if (!rule.validate()) {
        return false;
      }
    }
    return true;
  }
}

export const defaultSignUpUser: SignupProps = {
  first_name: '',
  second_name: '',
  email: '',
  login: '',
  password: '',
  phone: '',
  isSignedIn: false,
  error: '',
};
