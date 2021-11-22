import Handlebars from "handlebars";
import {IInputWithLabelParams} from '../../types/Types'

let component = "{{>InputWithLabel}}";

let compiled = Handlebars.compile(component);

let html = (data:IInputWithLabelParams) => compiled(data);
export default html;