import Handlebars from 'handlebars';
import { IInputWithLabelParams } from '../../../types/Types';

const component = '{{>InputWithLabel}}';

const compiled = Handlebars.compile(component);

const html = (data:IInputWithLabelParams) => compiled(data);
export default html;
