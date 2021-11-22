import Handlebars from 'handlebars/dist/cjs/handlebars';
import {IEditProfileProps} from '../../types/Types'

const editProfile =  `{{>editProfileTemplate}}`;
export default editProfile;

let compiled = Handlebars.compile(editProfile);


export const editProfileHtml:(params)=>string = (params:IEditProfileProps)=> {return compiled(params)};
