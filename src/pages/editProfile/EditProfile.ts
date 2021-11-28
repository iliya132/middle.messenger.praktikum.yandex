import { AccountEvents, IEditProfileProps, IInputGroupParams } from '../../types/Types';
import Block, { BlockEvents } from "../../utils/block";
import { editProfileParams, FormEvents } from "../../utils/constants";
import { templateCompiled } from "./EditProfile.hbs";
import InputValidator, { InputValidatorConfiguration } from "../../utils/inputValidator";

export default class EditProfilePage extends Block<IEditProfileProps>{
    constructor(root: HTMLElement) {
        super(editProfileParams, root);
        this.eventBus().on(BlockEvents.FLOW_RENDER, () => {
            this._enableValidation();
            this._addEvents();
        });
        this._enableValidation();
        this._addEvents();
        this._container = this.element.querySelector("#editProfileContainer") as HTMLDivElement;
    }

    render() {
        let newDiv = document.createElement("div");
        newDiv.innerHTML = templateCompiled(this.props).trim();
        this.element.appendChild(newDiv.firstChild);
    }
    _container: HTMLDivElement = null;
    _validators: InputValidatorConfiguration[] = [];
    _getInput(name: string) {
        return this.element.querySelector(`#${name}Field`) as HTMLInputElement;
    }

    _getLabel(input: HTMLInputElement) {
        return this.element.querySelector(`label[for="${input.id}"]`) as HTMLLabelElement;
    }

    _data() {
        return {
            firstName: this._getInput("firstName").value,
            secondName: this._getInput("secondName").value,
            login: this._getInput("login").value,
            email: this._getInput("email").value,
            displayName: this._getInput("displayName").value,
            oldPassword: this._getInput("oldPassword").value,
            newPassword: this._getInput("newPassword").value,
            phone: this._getInput("phone").value
        };
    }

    _enableValidation() {
        let firstNameInput = this._getInput("firstName");
        let secondNameInput = this._getInput("secondName");
        let loginInput = this._getInput("login");
        let emailInput = this._getInput("email");
        let displayNameInput = this._getInput("displayName");
        let oldPasswordInput = this._getInput("oldPassword");
        let newPasswordInput = this._getInput("newPassword");
        let phoneInput = this._getInput("phone");

        //#region configure validation rules
        let firstNameValidator = InputValidator.configure()
            .setRegexpRule(/^[A-Za-z-А-Яа-я]*$/)
            .setErrorMessage("First name can contain only letters")
            .required()
            .printErrorToLabel(this._getLabel(firstNameInput))
            .attachToInput(firstNameInput);
        this._validators.push(firstNameValidator);

        let secondNameValidator = InputValidator.configure()
            .setRegexpRule(/^[A-Za-z-А-Яа-я]*$/)
            .setErrorMessage("Second name can contain only letters")
            .required()
            .printErrorToLabel(this._getLabel(secondNameInput))
            .attachToInput(secondNameInput);
        this._validators.push(secondNameValidator);

        let loginValidator = InputValidator.configure()
            .setErrorMessage("Login can contain only latin letters")
            .setRegexpRule(/^(?=.*[A-z])[A-Za-z-_0-9]*$/)
            .minLen(3)
            .maxLen(50)
            .required()
            .printErrorToLabel(this._getLabel(loginInput))
            .attachToInput(loginInput);
        this._validators.push(loginValidator);

        let displayNameValidator = InputValidator.configure()
            .setErrorMessage("Login can contain only latin letters")
            .setRegexpRule(/[A-Za-z]/)
            .minLen(3)
            .maxLen(15)
            .required()
            .printErrorToLabel(this._getLabel(displayNameInput))
            .attachToInput(displayNameInput);
        this._validators.push(displayNameValidator);

        let emailValidator = InputValidator.configure()
            .setErrorMessage('Email specified is incorrect')
            .setRegexpRule(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/)
            .required()
            .printErrorToLabel(this._getLabel(emailInput))
            .attachToInput(emailInput);
        this._validators.push(emailValidator);

        let oldPasswordValidator = InputValidator.configure()
            .setRegexpRule(/^(?=.*[a-z])(?=.*[A-Z]).*/)
            .setErrorMessage("The password must be in Latin letters<br> and contain at least 1 capital letter and 1 lowercase letter")
            .minLen(8)
            .maxLen(40)
            .required()
            .printErrorToLabel(this._getLabel(oldPasswordInput))
            .attachToInput(oldPasswordInput);
        this._validators.push(oldPasswordValidator);

        let newPasswordValidator = InputValidator.configure()
            .setRegexpRule(/^(?=.*[a-z])(?=.*[A-Z]).*/)
            .setErrorMessage("The password must be in Latin letters<br> and contain at least 1 capital letter and 1 lowercase letter")
            .minLen(8)
            .maxLen(40)
            .required()
            .printErrorToLabel(this._getLabel(newPasswordInput))
            .attachToInput(newPasswordInput);
        this._validators.push(newPasswordValidator);

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
        let form = this.element.querySelector('form');
        let logoutLink = this.element.querySelector('#logout');
        let fileInput = this.element.querySelector("#file-input") as HTMLInputElement;
        let cancelBtn = this.element.querySelector('#cancelBtn');
        let avatarImg = this.element.querySelector('#avatar');
        avatarImg.addEventListener("click", ()=>fileInput.click());
        cancelBtn.addEventListener("click", ()=>{this.eventBus().emit(FormEvents.Cancel);});
        logoutLink.addEventListener("click", ()=>this.eventBus().emit(AccountEvents.Logout));
        this.eventBus().on(FormEvents.Submit, () => this._handleSubmit());
        this.eventBus().on(FormEvents.Cancel, () => this._handleCancel());
        this.eventBus().on(AccountEvents.Logout, ()=>this._handleLogout());
        
        
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            if (!this._validateForm()) {
                this.eventBus().emit(FormEvents.ValidationFailure);
                console.debug('Submit prevented, cause of invalid data!');
            } else {
                this.eventBus().emit(FormEvents.ValidationSucceed);
                this.eventBus().emit(FormEvents.Submit);
            }
        })
    }

    _handleSubmit() {
        console.log('POST backend/account/editProfile', JSON.stringify(this._data()));
    }

    _handleCancel(){
        console.debug("Cancel clicked");
    }

    _handleLogout(){
        console.log("GET backend/account/logout");
    }

    _validateForm() {
        for (let rule of this._validators) {
            if (!rule.validate()) {
                return false;
            }
        }
        return true;
    }

    show(): void {
        this._container.style.display = "block";
    }

    hide(): void {
        this._container.style.display = "none";
    }
}