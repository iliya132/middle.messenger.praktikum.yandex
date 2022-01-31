import { AccountEvents, IEditProfileProps } from '../../types/Types';
import Block from '../../utils/block';
import {
  AtLeastOneLetterAndLettersOrDigitsRegex,
  AtLeastOneLetterAndLettersOrDigitsRegexDescription,
  AtLeastOneUpperLetterAndOneDigit,
  AtLeastOneUpperLetterAndOneDigitDescription,
  editProfileParams,
  EmailRegex,
  EmailRegexDescription,
  FormEvents,
  OnlyLatinLettersOrSpaceRegex,
  OnlyLatinLettersOrSpaceRegexDescription,
  OnlyLettersRegex,
  OnlyLettersRegexDescription,
  PhoneRegex,
  PhoneRegexDescription,
} from '../../utils/constants';
import templateCompiled from './EditProfile.handlebars';
import InputValidator, { InputValidatorConfiguration } from '../../utils/inputValidator';
import Router from '../../utils/router';
import authController from '../../controllers/authController';
import userController from '../../controllers/userController';
import { RootState } from '../../utils/store';

export default class EditProfilePage extends Block<IEditProfileProps> {
  constructor(root: HTMLElement, props: IEditProfileProps) {
    super(props, root);
  }

  render() {
    const root = this.getElement();
    if (!root) {
      return;
    }
    const templateParams = editProfileParams;
    if (this.props.avatar) {
      templateParams.imgUrl = this.props.avatar;
    }
    const newDiv = document.createElement('div');
    newDiv.innerHTML = templateCompiled(editProfileParams).trim();
    if (window.location.pathname === '/settings') {
      const cancelBtn = newDiv.querySelector('#cancelBtn');
      if (cancelBtn) {
        cancelBtn.textContent = 'Back';
        cancelBtn.addEventListener('click', () => {
          Router.getInstance().back();
        });
      }
      root.innerHTML = '';
    }
    root.appendChild(newDiv.firstChild as ChildNode);
    this.setInputValues();
    this.enableValidationReal();
    this.addEventsReal();
  }

  private asString(str: string): string {
    return str ? str as string : '';
  }

  private setInputValues() {
    if (this.getInputReal('firstName')) {
      this.getInputReal('firstName').value = this.asString(this.props.firstName);
    }
    if (this.getInputReal('secondName')) {
      this.getInputReal('secondName').value = this.asString(this.props.secondName);
    }
    if (this.getInputReal('displayName')) {
      this.getInputReal('displayName').value = this.asString(this.props.displayName);
    }
    if (this.getInputReal('login')) {
      this.getInputReal('login').value = this.asString(this.props.login);
    }
    if (this.getInputReal('email')) {
      this.getInputReal('email').value = this.asString(this.props.email);
    }
    if (this.getInputReal('displayName')) {
      this.getInputReal('displayName').value = this.asString(this.props.displayName);
    }
    if (this.getInputReal('phone')) {
      this.getInputReal('phone').value = this.asString(this.props.phone);
    }
  }

  containerReal: HTMLDivElement;

  container() {
    if (!this.containerReal) {
      this.containerReal = this.getElement()?.querySelector('#editProfileContainer') as HTMLDivElement;
    }
    return this.containerReal;
  }

  fetchData(): void {
    if (window.location.pathname === '/settings') {
      authController.getUser().then((currentUser) => {
        const newProps: IEditProfileProps = {
          avatar: currentUser.user?.avatar ?? '',
          displayName: currentUser.user?.displayName ?? '',
          email: currentUser.user?.email ?? '',
          firstName: currentUser.user?.firstName ?? '',
          login: currentUser.user?.login ?? '',
          newPassword: '',
          oldPassword: '',
          phone: currentUser.user?.phone ?? '',
          secondName: currentUser.user?.secondName ?? '',
          error: currentUser.error as string,
        };
        this.setProps(newProps);
      });
    }
  }

  validatorsReal: InputValidatorConfiguration[] = [];

  getInputReal(name: string) {
    return this.getElement()?.querySelector(`#${name}Field`) as HTMLInputElement;
  }

  getLabelReal(input: HTMLInputElement) {
    return this.getElement()?.querySelector(`label[for="${input?.id}"]`) as HTMLLabelElement;
  }

  dataReal(): IEditProfileProps {
    return {
      firstName: this.getInputReal('firstName').value,
      secondName: this.getInputReal('secondName').value,
      login: this.getInputReal('login').value,
      email: this.getInputReal('email').value,
      displayName: this.getInputReal('displayName').value,
      oldPassword: this.getInputReal('oldPassword').value,
      newPassword: this.getInputReal('newPassword').value,
      phone: this.getInputReal('phone').value,
      avatar: '',
      error: '',
    };
  }

  enableValidationReal() {
    const firstNameInput = this.getInputReal('firstName');
    const secondNameInput = this.getInputReal('secondName');
    const loginInput = this.getInputReal('login');
    const emailInput = this.getInputReal('email');
    const displayNameInput = this.getInputReal('displayName');
    const oldPasswordInput = this.getInputReal('oldPassword');
    const newPasswordInput = this.getInputReal('newPassword');
    const phoneInput = this.getInputReal('phone');

    // #region configure validation rules
    const firstNameValidator = InputValidator.configure()
      .setRegexpRule(OnlyLettersRegex)
      .setErrorMessage(OnlyLettersRegexDescription)
      .required()
      .printErrorToLabel(this.getLabelReal(firstNameInput))
      .attachToInput(firstNameInput);
    this.validatorsReal.push(firstNameValidator);

    const secondNameValidator = InputValidator.configure()
      .setRegexpRule(OnlyLettersRegex)
      .setErrorMessage(OnlyLettersRegexDescription)
      .required()
      .printErrorToLabel(this.getLabelReal(secondNameInput))
      .attachToInput(secondNameInput);
    this.validatorsReal.push(secondNameValidator);

    const loginValidator = InputValidator.configure()
      .setErrorMessage(AtLeastOneLetterAndLettersOrDigitsRegexDescription)
      .setRegexpRule(AtLeastOneLetterAndLettersOrDigitsRegex)
      .minLen(3)
      .maxLen(50)
      .required()
      .printErrorToLabel(this.getLabelReal(loginInput))
      .attachToInput(loginInput);
    this.validatorsReal.push(loginValidator);

    const displayNameValidator = InputValidator.configure()
      .setErrorMessage(OnlyLatinLettersOrSpaceRegexDescription)
      .setRegexpRule(OnlyLatinLettersOrSpaceRegex)
      .minLen(3)
      .maxLen(15)
      .required()
      .printErrorToLabel(this.getLabelReal(displayNameInput))
      .attachToInput(displayNameInput);
    this.validatorsReal.push(displayNameValidator);

    const emailValidator = InputValidator.configure()
      .setErrorMessage(EmailRegexDescription)
      .setRegexpRule(EmailRegex)
      .required()
      .printErrorToLabel(this.getLabelReal(emailInput))
      .attachToInput(emailInput);
    this.validatorsReal.push(emailValidator);

    const oldPasswordValidator = InputValidator.configure()
      .setRegexpRule(AtLeastOneUpperLetterAndOneDigit)
      .setErrorMessage(AtLeastOneUpperLetterAndOneDigitDescription)
      .minLen(8)
      .maxLen(40)
      .printErrorToLabel(this.getLabelReal(oldPasswordInput))
      .attachToInput(oldPasswordInput);
    this.validatorsReal.push(oldPasswordValidator);

    const newPasswordValidator = InputValidator.configure()
      .setRegexpRule(AtLeastOneUpperLetterAndOneDigit)
      .setErrorMessage(AtLeastOneUpperLetterAndOneDigitDescription)
      .minLen(8)
      .maxLen(40)
      .printErrorToLabel(this.getLabelReal(newPasswordInput))
      .attachToInput(newPasswordInput);
    this.validatorsReal.push(newPasswordValidator);

    const phoneValidator = InputValidator.configure()
      .setErrorMessage(PhoneRegexDescription)
      .setRegexpRule(PhoneRegex)
      .required()
      .printErrorToLabel(this.getLabelReal(phoneInput))
      .attachToInput(phoneInput);
    this.validatorsReal.push(phoneValidator);
    // #endregion
  }

  stateToProps: (state: RootState) => IEditProfileProps = (state) => ({ ...this.props, ...state.auth.user });

  addEventsReal() {
    const form = this.getElement()?.querySelector('#profileForm');
    const logoutLink = this.getElement()?.querySelector('#logout');
    const fileInput = this.getElement()?.querySelector('#file-input') as HTMLInputElement;
    const cancelBtn = this.getElement()?.querySelector('#cancelBtn');
    const avatarImg = this.getElement()?.querySelector('#avatar');
    const avatarForm = document.getElementById('avatarForm') as HTMLFormElement;
    avatarImg?.addEventListener('click', () => {
      fileInput.click();
    });
    fileInput.addEventListener('change', () => {
      const form = new FormData(avatarForm);
      userController.changeAvatar(form).then(() => {
        authController.fetchUser();
      });
    });
    cancelBtn?.addEventListener('click', () => { this.eventBus().emit(FormEvents.Cancel); });
    logoutLink?.addEventListener('click', () => this.eventBus().emit(AccountEvents.Logout));
    this.eventBus().on(FormEvents.Submit, () => this.handleSubmit());
    this.eventBus().on(AccountEvents.Logout, () => this.handleLogout());

    form?.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!this.validateForm()) {
        this.eventBus().emit(FormEvents.ValidationFailure);
      } else {
        this.eventBus().emit(FormEvents.ValidationSucceed);
        this.eventBus().emit(FormEvents.Submit);
      }
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected componentDidMount(): void { }

  private handleSubmit() {
    const submittedData = this.dataReal();
    if (this.isPasswordChanged(submittedData)) {
      userController.changePassword(submittedData.oldPassword, submittedData.newPassword);
      return;
    }
    if (this.isChangesWasMade(submittedData)) {
      userController.changeProfile(submittedData);
    }
  }

  private isPasswordChanged(data: IEditProfileProps): boolean {
    return !!data.newPassword;
  }

  private isChangesWasMade(data: IEditProfileProps): boolean {
    const currentData = this.props;
    return currentData.displayName !== data.displayName
      || currentData.email !== data.email
      || currentData.firstName !== data.firstName
      || currentData.secondName !== data.secondName
      || currentData.login !== data.login
      || currentData.phone !== data.phone;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private handleLogout() {}

  private validateForm() {
    for (const rule of this.validatorsReal) {
      if (!rule.validate()) {
        return false;
      }
    }
    return true;
  }

  show(): void {
    this.container().style.display = 'block';
  }

  hide(): void {
    this.container().style.display = 'none';
  }
}
