import {registerHtml} from "../../components/Register/register";
import {IInputGroupParams} from '../../types/Types';
import RegisterPartials from "../../components/RegisterPartials";

RegisterPartials();
document.addEventListener('DOMContentLoaded', function () {
    let params: IInputGroupParams =
    {
        input: [
            {
                id: "firstName",
                name: "first_name",
                placeholder: "Enter your first name here...",
                type: "text",
                title: "firstName",
                className: ""
            },
            {
                id: "secondName",
                name: "second_name",
                placeholder: "Enter your second name here...",
                type: "text",
                title: "secondName",
                className: ""
            },
            {
                id: "loginField",
                name: "login",
                placeholder: "Enter your login here...",
                type: "text",
                title: "login",
                className: ""
            },
            {
                id: "emailField",
                name: "email",
                placeholder: "Enter your email here...",
                type: "email",
                title: "email",
                className: ""
            },
            {
                id: "passwordField",
                name: "password",
                placeholder: "Enter your password here...",
                type: "password",
                title: "password",
                className: ""
            },
            {
                id: "phoneField",
                name: "phone",
                placeholder: "Enter your phone number here...",
                type: "text",
                title: "phone",
                className: ""
            }
        ]
    };
    document.body.innerHTML = registerHtml(params.input);
});