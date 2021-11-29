export default class InputValidator {
  static configure() {
    // Можно было бы вернуть Proxy
    return new InputValidatorConfiguration();
  }
}

export class InputValidatorConfiguration {
  _meta:{
        regex:RegExp,
        isRequired: boolean,
        minLen:number,
        maxLen:number,
        inputElement:HTMLInputElement,
        errorLabel:HTMLLabelElement,
        regexpErrorMsg:string,
        error:string;
    } = {
      regex: null,
      isRequired: false,
      minLen: 0,
      maxLen: Infinity,
      inputElement: null,
      errorLabel: null,
      regexpErrorMsg: '',
      error: '',
    };

  setErrorMessage(errorText) {
    this._meta.regexpErrorMsg = errorText;
    return this;
  }

  setRegexpRule(regex:RegExp) {
    this._meta.regex = regex;
    return this;
  }

  required() {
    this._meta.isRequired = true;
    return this;
  }

  minLen(len:number) {
    this._meta.minLen = len;
    return this;
  }

  maxLen(len:number) {
    this._meta.maxLen = len;
    return this;
  }

  printErrorToLabel(label: HTMLLabelElement) {
    this._meta.errorLabel = label;
    return this;
  }

  attachToInput(element: HTMLInputElement) {
    this._meta.inputElement = element;
    element.addEventListener('focus', () => this._handleValidationEvent());
    element.addEventListener('blur', () => this._handleValidationEvent());
    return this;
  }

  validate() {
    return this._handleValidationEvent();
  }

  _handleValidationEvent() {
    const element = this._meta.inputElement;
    this._clearError();
    if (!this._validate(element.value)) {
      this._printError();
      this._markAsInvalid(element);
      return false;
    }
    this._markAsValid(element);
    return true;
  }

  _clearError() {
    this._meta.error = '';
    if (this._meta.errorLabel) {
      this._meta.errorLabel.innerHTML = '';
    }
  }

  _printError() {
    if (this._meta.errorLabel) {
      this._meta.errorLabel.innerHTML = this._meta.error;
    }
  }

  _markAsInvalid(input:HTMLInputElement) {
    input.setAttribute('data-validation', 'invalid');
  }

  _markAsValid(input:HTMLInputElement) {
    input.setAttribute('data-validation', 'valid');
  }

  _validate(value:string) {
    // required
    if (!value && this._meta.isRequired) {
      this._meta.error = 'This field is required';
      return false;
    }
    // length
    if (value.length < this._meta.minLen) {
      this._meta.error = `Value must be at least ${this._meta.minLen} length`;
      return false;
    }
    if (value.length > this._meta.maxLen) {
      this._meta.error = `Value must be less than ${this._meta.maxLen} characters`;
      return false;
    }
    // regexp
    if (this._meta.regex && !this._meta.regex.test(value)) {
      this._meta.error = this._meta.regexpErrorMsg;
      return false;
    }
    return true;
  }
}
