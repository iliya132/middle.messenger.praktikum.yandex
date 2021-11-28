import Handlebars from 'handlebars/dist/cjs/handlebars';
import LinkTemplate from "./link.templ";

Handlebars.registerPartial("link", LinkTemplate);

const link =  `{{>link}}`;
export default link;

let compiled = Handlebars.compile(link);
export const linkHtml:(caption:string, href:string, css:string)=>string = (caption:string, href:string, css:string) :string=> {return compiled({Caption: caption, href: href, Css:css})};