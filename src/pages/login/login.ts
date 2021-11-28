import { IInputParams } from "../../types/Types";
import Block, { BlockEvents } from "../../utils/block";
import { templateCompiled } from "./login.tmpl.hbs";
import InputValidator, { InputValidatorConfiguration } from "../../utils/inputValidator";
import { IInputGroupParams } from "../../types/Types";
import { FormEvents, loginPageProps } from "../../utils/constants";

export enum LoginEvents{
    SignUp = "SIGN_UP"
};

export default class LoginPage extends Block<IInputGroupParams>{
    constructor(root: HTMLElement) {
        super(loginPageProps, root);
        this.eventBus().on(BlockEvents.FLOW_RENDER, () => {
            this._enableValidation();
            this._addEvents();
        });
        this._enableValidation();
        this._addEvents();
    }

    _passwordInput() {
        return this.element.querySelector('#passwordField') as HTMLInputElement;
    }

    _passwordValue() {
        return this._passwordInput().value;
    }

    _loginInput() {
        return this.element.querySelector('#loginField') as HTMLInputElement;
    }

    _loginValue() {
        return this._loginInput().value;
    }

    render() {
        this.element.innerHTML = templateCompiled(this.props);

    }

    _validators: {
        loginValidator: InputValidatorConfiguration,
        passwordValidator: InputValidatorConfiguration
    } = {
            loginValidator: null,
            passwordValidator: null
        }

    _enableValidation() {
        let loginInput = this._loginInput();
        let passwordInput = this._passwordInput();
        let loginLabel = this.element.querySelector('label[for="loginField"]') as HTMLLabelElement;
        let passwordLabel = this.element.querySelector('label[for="passwordField"]') as HTMLLabelElement;

        this._validators.loginValidator = InputValidator.configure()
            .setErrorMessage("Login can contain only latin letters")
            .setRegexpRule(/^(?=.*[A-z])[A-Za-z-_0-9]*$/)
            .minLen(3)
            .maxLen(15)
            .required()
            .printErrorToLabel(loginLabel)
            .attachToInput(loginInput);

        this._validators.passwordValidator = InputValidator.configure()
            .setRegexpRule(/^(?=.*[a-z])(?=.*[A-Z]).*/)
            .setErrorMessage("The password must be in Latin letters<br> and contain at least 1 capital letter and 1 lowercase letter")
            .minLen(8)
            .maxLen(40)
            .required()
            .printErrorToLabel(passwordLabel)
            .attachToInput(passwordInput);
    }

    _addEvents() {
        let loginForm = this.element.querySelector('form');
        let signUpLink = this.element.querySelector('#signUpLink');
        this.eventBus().on(FormEvents.Submit, () => this._handleSubmit());

        signUpLink.addEventListener("click", ()=>{
            this.eventBus().emit(LoginEvents.SignUp)
        }
        );

        loginForm.addEventListener('submit', (event) => {
            if (!this._validateForm()) {
                console.log('Submit prevented, cause of invalid data!');
            } else {
                this.eventBus().emit(FormEvents.Submit);
            }
            event.preventDefault();
        })
    }

    _handleSubmit() {
        console.log('POST backend/account/login', JSON.stringify({ login: this._loginValue(), password: this._passwordValue() }));
    }

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