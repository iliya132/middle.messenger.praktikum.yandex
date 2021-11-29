import Handlebars from 'handlebars';
import { IInputGroupParams } from '../../../types/Types';

const inputGroup = '{{>inputGroup}}';
export default inputGroup;

const compiled = Handlebars.compile(inputGroup);

export const inputGroupHtml:(IInputParams:IInputGroupParams)=>string = (inputs:IInputGroupParams) => compiled({ input: inputs });
