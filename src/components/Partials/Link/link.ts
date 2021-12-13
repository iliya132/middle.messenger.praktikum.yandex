import Handlebars from 'handlebars/dist/cjs/handlebars';
import LinkTemplate from './link.templ';

Handlebars.registerPartial('link', LinkTemplate);

const link = '{{>link}}';
export default link;

const compiled = Handlebars.compile(link);
export const linkHtml:(caption:string, href:string, css:string)=>string = (caption:string, href:string, css:string) :string => compiled({ Caption: caption, href, Css: css });
