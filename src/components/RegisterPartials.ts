import inputWithLabelHbs from './Partials/InputWithLabel/inputWithLabel.hbs';
import inputGroupHbs from './Partials/InputGroup/inputGroup.tmpl.hbs';
import Handlebars from "handlebars";
import contextMenuHbs from './Partials/ContextMenu/contextMenu.hbs';
import linkHbs from './Partials/Link/link.hbs';

let isRegistered = false;
export default function RegisterPartials(){
    if(!isRegistered){
        Handlebars.registerPartial("InputWithLabel", inputWithLabelHbs);
        Handlebars.registerPartial("InputGroup", inputGroupHbs);
        Handlebars.registerPartial("Link", linkHbs);
        Handlebars.registerPartial("ContextMenu", contextMenuHbs);
        isRegistered = true;
    }
}
