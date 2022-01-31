import Handlebars from "handlebars";
import inputWithLabelHbs from './Partials/InputWithLabel/template.handlebars';
import inputGroupHbs from './Partials/InputGroup/template.handlebars';
import contextMenuHbs from './Partials/ContextMenu/template.handlebars';
import linkHbs from './Partials/Link/template.handlebars';

let isRegistered = false;
export default function RegisterPartials() {
  if (!isRegistered) {
    Handlebars.registerPartial('InputWithLabel', inputWithLabelHbs);
    Handlebars.registerPartial('InputGroup', inputGroupHbs);
    Handlebars.registerPartial('Link', linkHbs);
    Handlebars.registerPartial('ContextMenu', contextMenuHbs);
    isRegistered = true;
  }
}
