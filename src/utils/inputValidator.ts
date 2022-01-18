export default class InputValidator {
  static configure() {
    // Можно было бы вернуть Proxy
    return new InputValidatorConfiguration();
  }
}

interface IMeta {
  regex?: RegExp | null,
  isRequired: boolean,
  minLen: number,
  maxLen: number,
  inputElement: HTMLInputElement | null,
  errorLabel: HTMLLabelElement | null,
  regexpErrorMsg: string,
  error: string;
}

export class InputValidatorConfiguration {
  meta: IMeta= {
      regex: null,
      isRequired: false,
      minLen: 0,
      maxLen: Infinity,
      inputElement: null,
      errorLabel: null,
      regexpErrorMsg: '',
      error: '',
    };

  setErrorMessage(errorText: string) {
    this.meta.regexpErrorMsg = errorText;
    return this;
  }

  setRegexpRule(regex: RegExp) {
    this.meta.regex = regex;
    return this;
  }

  required() {
    this.meta.isRequired = true;
    return this;
  }

  minLen(len: number) {
    this.meta.minLen = len;
    return this;
  }

  maxLen(len: number) {
    this.meta.maxLen = len;
    return this;
  }

  printErrorToLabel(label: HTMLLabelElement) {
    this.meta.errorLabel = label;
    return this;
  }

  attachToInput(element: HTMLInputElement) {
    this.meta.inputElement = element;
    element.addEventListener('focus', () => this.handleValidationEvent());
    element.addEventListener('blur', () => this.handleValidationEvent());
    return this;
  }

  validate() {
    return this.handleValidationEvent();
  }

  handleValidationEvent() {
    const element = this.meta.inputElement;
    if(element === null){
      return false;
    }
    this.clearError();
    if (!this.validateReal(element.value)) {
      this.printError();
      this.markAsInvalid(element);
      return false;
    }
    this.markAsValid(element);
    return true;
  }

  clearError() {
    this.meta.error = '';
    if (this.meta.errorLabel) {
      this.meta.errorLabel.innerHTML = '';
    }
  }

  printError() {
    if (this.meta.errorLabel) {
      this.meta.errorLabel.innerHTML = this.meta.error;
    }
  }

  markAsInvalid(input: HTMLInputElement) {
    input.setAttribute('data-validation', 'invalid');
  }

  markAsValid(input: HTMLInputElement) {
    input.setAttribute('data-validation', 'valid');
  }

  private validateReal(value: string) {
    // required
    if (!value && this.meta.isRequired) {
      this.meta.error = 'This field is required';
      return false;
    } if (!this.meta.isRequired && !value) {
      return true;
    }

    // length
    if (value.length < this.meta.minLen) {
      this.meta.error = `Value must be at least ${this.meta.minLen} length`;
      return false;
    }
    if (value.length > this.meta.maxLen) {
      this.meta.error = `Value must be less than ${this.meta.maxLen} characters`;
      return false;
    }
    // regexp
    if (this.meta.regex && !this.meta.regex.test(value)) {
      this.meta.error = this.meta.regexpErrorMsg;
      return false;
    }
    return true;
  }
}
