import Handlebars from 'handlebars/dist/cjs/handlebars';
import {IInputGroupParams} from '../../../types/Types'

const inputGroup =  `{{>inputGroup}}`;
export default inputGroup;

let compiled = Handlebars.compile(inputGroup);

export const inputGroupHtml:(IInputParams:IInputGroupParams)=>string = (inputs:IInputGroupParams)=> {return compiled({input: inputs})};
