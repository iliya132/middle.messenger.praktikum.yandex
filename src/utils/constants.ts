import cat from '../../static/img/cat.png';
import cats from '../../static/img/cats.png';
import showMore from '../../static/img/showMore.png';
import { IEditProfileProps, IInputGroupParams, contextMenuProps } from '../types/Types';

export const catSrc = cat;
export const catsSrc = cats;
export const showMoreSrc = showMore;
export const loginPageProps: IInputGroupParams = {
  input: [
    {
      id: 'loginField',
      name: 'login',
      placeholder: 'Enter your login here...',
      type: 'text',
      title: '',
      className: '',
      autocomplete: 'username',

    },
    {
      id: 'passwordField',
      name: 'password',
      placeholder: 'Enter your password here...',
      type: 'password',
      title: '',
      className: '',
      autocomplete: 'current-password',
    },
  ],
};

export const registerPageParams: IInputGroupParams = {
  input: [
    {
      id: 'firstNameField',
      name: 'first_name',
      placeholder: 'Enter your first name here...',
      type: 'text',
      title: 'firstName',
      className: 'capitalize',
      autocomplete: 'given-name',
    },
    {
      id: 'secondNameField',
      name: 'second_name',
      placeholder: 'Enter your second name here...',
      type: 'text',
      title: 'secondName',
      className: 'capitalize',
      autocomplete: 'family-name',
    },
    {
      id: 'loginField',
      name: 'login',
      placeholder: 'Enter your login here...',
      type: 'text',
      title: 'login',
      className: '',
      autocomplete: 'username',
    },
    {
      id: 'emailField',
      name: 'email',
      placeholder: 'Enter your email here...',
      type: 'email',
      title: 'email',
      className: '',
      autocomplete: 'email',
    },
    {
      id: 'passwordField',
      name: 'password',
      placeholder: 'Enter your password here...',
      type: 'password',
      title: 'password',
      className: '',
      autocomplete: 'current-password',
    },
    {
      id: 'phoneField',
      name: 'phone',
      placeholder: 'Enter your phone number here...',
      type: 'text',
      title: 'phone',
      className: '',
      autocomplete: 'tel',
    },
  ],
};

export const editProfileParams: IEditProfileProps = {
  imgUrl: catSrc,
  colOneInputs: [
    {
      id: 'firstNameField',
      name: 'firstName',
      placeholder: 'Enter your first name here...',
      className: '',
      title: 'First name',
      type: 'text',
      autocomplete: 'given-name',
    },
    {
      id: 'secondNameField',
      name: 'secondName',
      placeholder: 'Enter your second name here...',
      className: '',
      title: 'Second name',
      type: 'text',
      autocomplete: 'family-name',
    },
    {
      id: 'displayNameField',
      name: 'displayName',
      placeholder: 'Enter your display name here...',
      className: '',
      title: 'Display name',
      type: 'text',
      autocomplete: 'nickname',
    },
    {
      id: 'loginField',
      name: 'login',
      placeholder: 'Enter your login here...',
      className: '',
      title: 'Login',
      type: 'text',
      autocomplete: 'username',
    },
  ],
  colTwoInputs: [
    {
      id: 'emailField',
      name: 'email',
      placeholder: 'Enter your email here...',
      className: '',
      title: 'Email',
      type: 'email',
      autocomplete: 'email',
    },
    {
      id: 'phoneField',
      name: 'phone',
      placeholder: 'Enter your phone here...',
      className: '',
      title: 'Phone',
      type: 'text',
      autocomplete: 'tel',
    },
    {
      id: 'oldPasswordField',
      name: 'oldPassword',
      placeholder: 'Enter your old password here...',
      className: '',
      title: 'Old password',
      type: 'password',
      autocomplete: 'current-password',
    },
    {
      id: 'newPasswordField',
      name: 'newPassword',
      placeholder: 'Enter your new password here...',
      className: '',
      title: 'New password',
      type: 'password',
      autocomplete: 'new-password',
    },
  ],
};

export enum FormEvents{
        Submit = 'SUBMIT',
        ValidationFailure = 'INVALID',
        ValidationSucceed = 'VALID',
        Cancel = 'CANCEL'
    }

export const contextProps:contextMenuProps = {
  options: [
    {
      name: 'Delete chat',
      id: 'deleteChat',
    },
    {
      name: 'Disable notifications',
      id: 'disableNotifications',
    },
    {
      name: 'Pin chat',
      id: 'pinChat',
    },
  ],
};

export const OnlyLettersRegex = /^[A-Za-z-А-Яа-я]*$/;
export const OnlyLettersRegexDescription = "Field can contain only letters";
export const AtLeastOneLetterAndLettersOrDigitsRegex = /^(?=.*[A-z])[A-Za-z-_0-9]*$/;
export const AtLeastOneLetterAndLettersOrDigitsRegexDescription = "Field must contain at least 1 letter and digit";
export const OnlyLatinLettersRegex = /^[A-Za-z]*$/;
export const OnlyLatinLettersRegexDescription = "Field can contain only latin characters";
export const EmailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
export const EmailRegexDescription = "Entered email is invalid";
export const AtLeastOneUpperLetterAndOneDigit = /^(?=.*[A-Z])(?=.*[0-9]).*/;
export const AtLeastOneUpperLetterAndOneDigitDescription = "Field must contain at least 1 uppercase and 1 digit";
export const PhoneRegex = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
export const PhoneRegexDescription = "Entered phone is invalid";
