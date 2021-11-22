import Handlebars from 'handlebars/dist/cjs/handlebars';
import {IInputGroupParams} from "../../types/Types";

const registerTemplate =  `{{>registerTemplate}}`;
export default registerTemplate;

let compiled = Handlebars.compile(registerTemplate);

export const registerHtml:(IInputGroupParams)=>string = (inputs:IInputGroupParams)=> {
    return compiled({input: inputs})
};