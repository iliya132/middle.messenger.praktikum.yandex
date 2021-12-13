import Handlebars from 'handlebars';
import { contextMenuProps } from '../../../types/Types';

const component = '{{>contextMenu}}';

const compiled = Handlebars.compile(component);

const html = (data:contextMenuProps) => compiled(data);
export default html;
