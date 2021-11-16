import inputWithLabel from './InputWithLabel/inputWithLabel.hbs';
import inputGroupTemplate from './InputGroup/inputGroup.tmpl.hbs';
import Handlebars from 'handlebars/dist/cjs/handlebars';
import link from './Link/link';
import loginTemplate from "./Login/login.tmpl.hbs";
import registerTemplate from "./Register/register.tmpl";
import editProfileTemplate from "./EditProfile/EditProfile.hbs";

export default function RegisterPartials(){
    Handlebars.registerPartial("InputWithLabel", inputWithLabel);
    Handlebars.registerPartial("InputGroup", inputGroupTemplate);
    Handlebars.registerPartial("Link", link);
    Handlebars.registerPartial("loginTemplate", loginTemplate);
    Handlebars.registerPartial("registerTemplate", registerTemplate);
    Handlebars.registerPartial("editProfileTemplate", editProfileTemplate)
}
