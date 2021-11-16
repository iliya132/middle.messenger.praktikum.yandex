import { editProfileHtml } from '../../components/EditProfile/editProfile';
import { IEditProfileProps } from '../../types/Types';
import Register from "../../components/RegisterPartials";
import img from "../../../static/img/cat.png";

Register();
document.addEventListener('DOMContentLoaded', function () {

    let params: IEditProfileProps =
    {
        imgUrl: img,
        colOneInputs:[
            {
                id: "firstName",
                name: "firstName",
                placeholder: "Enter your first name here...",
                className:"",
                title: "First name",
                type: "text"
            },
            {
                id: "secondName",
                name: "secondName",
                placeholder: "Enter your second name here...",
                className:"",
                title: "Second name",
                type: "text"
            },
            {
                id: "displayName",
                name: "displayName",
                placeholder: "Enter your display name here...",
                className:"",
                title: "Display name",
                type: "text"
            },
            {
                id: "login",
                name: "login",
                placeholder: "Enter your login here...",
                className:"",
                title: "Login",
                type: "text"
            }
        ],
        colTwoInputs:[
            {
                id: "email",
                name: "email",
                placeholder: "Enter your email here...",
                className:"",
                title: "Email",
                type: "email"
            },
            {
                id: "phone",
                name: "phone",
                placeholder: "Enter your phone here...",
                className:"",
                title: "Phone",
                type: "text"
            }
            ,
            {
                id: "oldPassword",
                name: "oldPassword",
                placeholder: "Enter your old password here...",
                className:"",
                title: "Old password",
                type: "password"
            },
            {
                id: "newPassword",
                name: "newPassword",
                placeholder: "Enter your new password here...",
                className:"",
                title: "New password",
                type: "password"
            }
        ]
    };
    let html = editProfileHtml(params);
    
    document.body.innerHTML = html;
    document.getElementById('avatar').addEventListener('onClick', ()=>{
        alert('clicked');
    });
});