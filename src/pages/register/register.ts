import { IInputGroupParams } from '../../types/Types';
import Block, { BlockEvents } from "../../utils/block";
import { FormEvents, registerPageParams } from "../../utils/constants";
import { templateCompiled } from "./register.hbs";
import InputValidator, { InputValidatorConfiguration } from "../../utils/inputValidator";

export enum RegisterEvents {
    Login = "LOGIN"
}

export default class RegisterPage extends Block<IInputGroupParams>{
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
        this.element.innerHTML = templateCompiled(this.props);
    }

    _validators: InputValidatorConfiguration[] = [];
    _getInput(name: string) {
        return this.element.querySelector(`#${name}Field`) as HTMLInputElement;
    }

    _getLabel(input: HTMLInputElement) {
        return this.element.querySelector(`label[for="${input.id}"]`) as HTMLLabelElement;
    }

    _data(){
        return {
            firstName: this._getInput("firstName").value,
            secondName: this._getInput("secondName").value,
            login: this._getInput("login").value,
            email: this._getInput("email").value,
            password: this._getInput("password").value,
            phone: this._getInput("phone").value
        };
    }

    _enableValidation() {
        let firstNameInput = this._getInput("firstName");
        let secondNameInput = this._getInput("secondName");
        let loginInput = this._getInput("login");
        let emailInput = this._getInput("email");
        let passwordInput = this._getInput("password");
        let phoneInput = this._getInput("phone");

        //#region configure validation rules
        let firstNameValidator = InputValidator.configure()
            .setRegexpRule(/^[A-Za-z-]*$/)
            .required()
            .printErrorToLabel(this._getLabel(firstNameInput))
            .attachToInput(firstNameInput);
        this._validators.push(firstNameValidator);

        let secondNameValidator = InputValidator.configure()
            .setRegexpRule(/^[A-Za-z-]*$/)
            .required()
            .printErrorToLabel(this._getLabel(secondNameInput))
            .attachToInput(secondNameInput);
        this._validators.push(secondNameValidator);

        let loginValidator = InputValidator.configure()
            .setErrorMessage("Login can contain only latin letters")
            .setRegexpRule(/^(?=.*[A-z])[A-Za-z-_0-9]*$/)
            .minLen(3)
            .maxLen(20)
            .required()
            .printErrorToLabel(this._getLabel(loginInput))
            .attachToInput(loginInput);
        this._validators.push(loginValidator);

        let emailValidator = InputValidator.configure()
            .setErrorMessage('Email specified is incorrect')
            .setRegexpRule(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/)
            .required()
            .printErrorToLabel(this._getLabel(emailInput))
            .attachToInput(emailInput);
        this._validators.push(emailValidator);

        let passwordValidator = InputValidator.configure()
            .setRegexpRule(/^(?=.*[a-z])(?=.*[A-Z]).*/)
            .setErrorMessage("The password must be in Latin letters<br>and contain at least 1 capital letter and 1 lowercase letter")
            .minLen(8)
            .maxLen(40)
            .required()
            .printErrorToLabel(this._getLabel(passwordInput))
            .attachToInput(passwordInput);
        this._validators.push(passwordValidator);

        let phoneValidator = InputValidator.configure()
            .setErrorMessage("Phone number specified is incorrect")
            .setRegexpRule(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/)
            .required()
            .printErrorToLabel(this._getLabel(phoneInput))
            .attachToInput(phoneInput);
        this._validators.push(phoneValidator);
        //#endregion
    }

    _addEvents() {
        let loginLink = this.element.querySelector('#Login');
        let signUpForm = this.element.querySelector('form');
        this.eventBus().on(FormEvents.Submit, () => this._handleSubmit());
        
        loginLink.addEventListener("click", ()=>this.eventBus().emit(RegisterEvents.Login));
        signUpForm.addEventListener('submit', (event) => {
            if (!this._validateForm()) {
                console.log('Submit prevented, cause of invalid data!');
            } else {
                this.eventBus().emit(FormEvents.Submit);
            }
            event.preventDefault();
        })
    }

    _handleSubmit() {
        console.log('POST backend/account/register', JSON.stringify(this._data()));
    }

    _validateForm() {
        for (let rule of this._validators) {
            if (!rule.validate()) {
                return false;
            }
        }
        return true;
    }
}