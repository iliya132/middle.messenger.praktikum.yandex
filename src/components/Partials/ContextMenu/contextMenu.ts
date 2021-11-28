
import Handlebars from "handlebars";
import {contextMenuProps} from '../../../types/Types'

let component = "{{>contextMenu}}";

let compiled = Handlebars.compile(component);

let html = (data:contextMenuProps) => compiled(data);
export default html;