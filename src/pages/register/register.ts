import { IInputGroupParams } from '../../types/Types';
import Block, { BlockEvents } from '../../utils/block';
import {
  AtLeastOneLetterAndLettersOrDigitsRegex, AtLeastOneLetterAndLettersOrDigitsRegexDescription, AtLeastOneUpperLetterAndOneDigit, AtLeastOneUpperLetterAndOneDigitDescription, EmailRegex, EmailRegexDescription, FormEvents, OnlyLettersRegex, PhoneRegex, PhoneRegexDescription, registerPageParams,
} from '../../utils/constants';
import { templateCompiled } from './register.hbs';
import InputValidator, { InputValidatorConfiguration } from '../../utils/inputValidator';

export enum RegisterEvents {
    Login = 'LOGIN'
}

export default class RegisterPage extends Block<IInputGroupParams> {
  constructor(root: HTMLElement) {
    super(registerPageParams, root);
    this.eventBus().on(BlockEvents.FLOW_RENDER, () => {
      this._enableValidation();
      this._addEvents();
    });
    this._enableValidation();
    this._addEvents();
  }

  render() {
    if (this.element) {
      this.element.innerHTML = templateCompiled(this.props);
    }
  }

  _validators: InputValidatorConfiguration[] = [];

  _getInput(name: string) {
    return this.element?.querySelector(`#${name}Field`) as HTMLInputElement;
  }

  _getLabel(input: HTMLInputElement) {
    return this.element?.querySelector(`label[for="${input.id}"]`) as HTMLLabelElement;
  }

  _data() {
    return {
      firstName: this._getInput('firstName').value,
      secondName: this._getInput('secondName').value,
      login: this._getInput('login').value,
      email: this._getInput('email').value,
      password: this._getInput('password').value,
      phone: this._getInput('phone').value,
    };
  }

  _enableValidation() {
    const firstNameInput = this._getInput('firstName');
    const secondNameInput = this._getInput('secondName');
    const loginInput = this._getInput('login');
    const emailInput = this._getInput('email');
    const passwordInput = this._getInput('password');
    const phoneInput = this._getInput('phone');

    // #region configure validation rules
    const firstNameValidator = InputValidator.configure()
      .setRegexpRule(OnlyLettersRegex)
      .required()
      .printErrorToLabel(this._getLabel(firstNameInput))
      .attachToInput(firstNameInput);
    this._validators.push(firstNameValidator);

    const secondNameValidator = InputValidator.configure()
      .setRegexpRule(OnlyLettersRegex)
      .required()
      .printErrorToLabel(this._getLabel(secondNameInput))
      .attachToInput(secondNameInput);
    this._validators.push(secondNameValidator);

    const loginValidator = InputValidator.configure()
      .setErrorMessage(AtLeastOneLetterAndLettersOrDigitsRegexDescription)
      .setRegexpRule(AtLeastOneLetterAndLettersOrDigitsRegex)
      .minLen(3)
      .maxLen(20)
      .required()
      .printErrorToLabel(this._getLabel(loginInput))
      .attachToInput(loginInput);
    this._validators.push(loginValidator);

    const emailValidator = InputValidator.configure()
      .setErrorMessage(EmailRegexDescription)
      .setRegexpRule(EmailRegex)
      .required()
      .printErrorToLabel(this._getLabel(emailInput))
      .attachToInput(emailInput);
    this._validators.push(emailValidator);

    const passwordValidator = InputValidator.configure()
      .setRegexpRule(AtLeastOneUpperLetterAndOneDigit)
      .setErrorMessage(AtLeastOneUpperLetterAndOneDigitDescription)
      .minLen(8)
      .maxLen(40)
      .required()
      .printErrorToLabel(this._getLabel(passwordInput))
      .attachToInput(passwordInput);
    this._validators.push(passwordValidator);

    const phoneValidator = InputValidator.configure()
      .setErrorMessage(PhoneRegexDescription)
      .setRegexpRule(PhoneRegex)
      .required()
      .printErrorToLabel(this._getLabel(phoneInput))
      .attachToInput(phoneInput);
    this._validators.push(phoneValidator);
    // #endregion
  }

  _addEvents() {
    const loginLink = this.element?.querySelector('#Login');
    const signUpForm = this.element?.querySelector('form');
    this.eventBus().on(FormEvents.Submit, () => this._handleSubmit());

    loginLink?.addEventListener('click', () => this.eventBus().emit(RegisterEvents.Login));
    signUpForm?.addEventListener('submit', (event) => {
      if (!this._validateForm()) {
        console.log('Submit prevented, cause of invalid data!');
      } else {
        this.eventBus().emit(FormEvents.Submit);
      }
      event.preventDefault();
    });
  }

  _handleSubmit() {
    console.log('POST backend/account/register', JSON.stringify(this._data()));
  }

  _validateForm() {
    for (const rule of this._validators) {
      if (!rule.validate()) {
        return false;
      }
    }
    return true;
  }
}
