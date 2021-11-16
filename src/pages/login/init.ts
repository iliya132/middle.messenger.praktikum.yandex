import { loginHtml } from "../../components/Login/login";
import { IInputGroupParams } from '../../types/Types';
import Register from "../../components/RegisterPartials";

Register();
document.addEventListener('DOMContentLoaded', function () {

    let params: IInputGroupParams =
    {
        input: [
            {
                id: "loginField",
                name: "login",
                placeholder: "Enter your login here...",
                type: "text",
                title: "",
                className: ""
                
            },
            {
                id: "passwordField",
                name: "password",
                placeholder: "Enter your password here...",
                type: "password",
                title: "",
                className: ""
            },
        ]
    };
    document.body.innerHTML = loginHtml(params.input);
});