import Handlebars from 'handlebars/dist/cjs/handlebars';
import {IInputGroupParams} from "../../types/Types";

const loginTemplate =  `{{>loginTemplate}}`;
export default loginTemplate;

let compiled = Handlebars.compile(loginTemplate);

export const loginHtml:(inputs)=>string = (inputs:IInputGroupParams)=> {
    return compiled({input: inputs})
};