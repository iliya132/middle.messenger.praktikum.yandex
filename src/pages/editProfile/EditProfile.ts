import { AccountEvents, IEditProfileProps } from '../../types/Types';
import Block, { BlockEvents } from '../../utils/block';
import {
  AtLeastOneLetterAndLettersOrDigitsRegex, AtLeastOneUpperLetterAndOneDigit, editProfileParams, EmailRegex, FormEvents, OnlyLatinLettersRegex, OnlyLettersRegex, PhoneRegex,
} from '../../utils/constants';
import { templateCompiled } from './EditProfile.hbs';
import InputValidator, { InputValidatorConfiguration } from '../../utils/inputValidator';

export default class EditProfilePage extends Block<IEditProfileProps> {
  constructor(root: HTMLElement) {
    super(editProfileParams, root);
    this.eventBus().on(BlockEvents.FLOW_RENDER, () => {
      this._enableValidation();
      this._addEvents();
    });
    this._enableValidation();
    this._addEvents();
    this._container = this.element?.querySelector('#editProfileContainer') as HTMLDivElement;
  }

  render() {
    const newDiv = document.createElement('div');
    newDiv.innerHTML = templateCompiled(this.props).trim();
    this.element?.appendChild(newDiv.firstChild as ChildNode);
  }

  _container: HTMLDivElement;

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
      displayName: this._getInput('displayName').value,
      oldPassword: this._getInput('oldPassword').value,
      newPassword: this._getInput('newPassword').value,
      phone: this._getInput('phone').value,
    };
  }

  _enableValidation() {
    const firstNameInput = this._getInput('firstName');
    const secondNameInput = this._getInput('secondName');
    const loginInput = this._getInput('login');
    const emailInput = this._getInput('email');
    const displayNameInput = this._getInput('displayName');
    const oldPasswordInput = this._getInput('oldPassword');
    const newPasswordInput = this._getInput('newPassword');
    const phoneInput = this._getInput('phone');

    // #region configure validation rules
    const firstNameValidator = InputValidator.configure()
      .setRegexpRule(OnlyLettersRegex)
      .setErrorMessage('First name can contain only letters')
      .required()
      .printErrorToLabel(this._getLabel(firstNameInput))
      .attachToInput(firstNameInput);
    this._validators.push(firstNameValidator);

    const secondNameValidator = InputValidator.configure()
      .setRegexpRule(OnlyLettersRegex)
      .setErrorMessage('Second name can contain only letters')
      .required()
      .printErrorToLabel(this._getLabel(secondNameInput))
      .attachToInput(secondNameInput);
    this._validators.push(secondNameValidator);

    const loginValidator = InputValidator.configure()
      .setErrorMessage('Login can contain only latin letters')
      .setRegexpRule(AtLeastOneLetterAndLettersOrDigitsRegex)
      .minLen(3)
      .maxLen(50)
      .required()
      .printErrorToLabel(this._getLabel(loginInput))
      .attachToInput(loginInput);
    this._validators.push(loginValidator);

    const displayNameValidator = InputValidator.configure()
      .setErrorMessage('Login can contain only latin letters')
      .setRegexpRule(OnlyLatinLettersRegex)
      .minLen(3)
      .maxLen(15)
      .required()
      .printErrorToLabel(this._getLabel(displayNameInput))
      .attachToInput(displayNameInput);
    this._validators.push(displayNameValidator);

    const emailValidator = InputValidator.configure()
      .setErrorMessage('Email specified is incorrect')
      .setRegexpRule(EmailRegex)
      .required()
      .printErrorToLabel(this._getLabel(emailInput))
      .attachToInput(emailInput);
    this._validators.push(emailValidator);

    const oldPasswordValidator = InputValidator.configure()
      .setRegexpRule(AtLeastOneUpperLetterAndOneDigit)
      .setErrorMessage('The password must be in Latin letters<br> and contain at least 1 capital letter and 1 lowercase letter')
      .minLen(8)
      .maxLen(40)
      .required()
      .printErrorToLabel(this._getLabel(oldPasswordInput))
      .attachToInput(oldPasswordInput);
    this._validators.push(oldPasswordValidator);

    const newPasswordValidator = InputValidator.configure()
      .setRegexpRule(AtLeastOneUpperLetterAndOneDigit)
      .setErrorMessage('The password must be in Latin letters<br> and contain at least 1 capital letter and 1 lowercase letter')
      .minLen(8)
      .maxLen(40)
      .required()
      .printErrorToLabel(this._getLabel(newPasswordInput))
      .attachToInput(newPasswordInput);
    this._validators.push(newPasswordValidator);

    const phoneValidator = InputValidator.configure()
      .setErrorMessage('Phone number specified is incorrect')
      .setRegexpRule(PhoneRegex)
      .required()
      .printErrorToLabel(this._getLabel(phoneInput))
      .attachToInput(phoneInput);
    this._validators.push(phoneValidator);
    // #endregion
  }

  _addEvents() {
    const form = this.element?.querySelector('form');
    const logoutLink = this.element?.querySelector('#logout');
    const fileInput = this.element?.querySelector('#file-input') as HTMLInputElement;
    const cancelBtn = this.element?.querySelector('#cancelBtn');
    const avatarImg = this.element?.querySelector('#avatar');
    avatarImg?.addEventListener('click', () => fileInput.click());
    cancelBtn?.addEventListener('click', () => { this.eventBus().emit(FormEvents.Cancel); });
    logoutLink?.addEventListener('click', () => this.eventBus().emit(AccountEvents.Logout));
    this.eventBus().on(FormEvents.Submit, () => this._handleSubmit());
    this.eventBus().on(AccountEvents.Logout, () => this._handleLogout());

    form?.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!this._validateForm()) {
        this.eventBus().emit(FormEvents.ValidationFailure);
      } else {
        this.eventBus().emit(FormEvents.ValidationSucceed);
        this.eventBus().emit(FormEvents.Submit);
      }
    });
  }

  _handleSubmit() {
    console.log('POST backend/account/editProfile', JSON.stringify(this._data()));
  }

  _handleLogout() {
    console.log('GET backend/account/logout');
  }

  _validateForm() {
    for (const rule of this._validators) {
      if (!rule.validate()) {
        return false;
      }
    }
    return true;
  }

  show(): void {
    this._container.style.display = 'block';
  }

  hide(): void {
    this._container.style.display = 'none';
  }
}
