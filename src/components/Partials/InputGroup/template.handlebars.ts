import Handlebars from "handlebars";

const template = `<div class="input-group">
    {{#each input}}
        {{> InputWithLabel inputType=type Id=id placeholder=placeholder className=className name=name}}
    {{/each}}
</div>`

export default Handlebars.compile(template);
