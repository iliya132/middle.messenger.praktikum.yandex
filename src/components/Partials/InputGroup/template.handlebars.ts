const template = `<div class="input-group">
    {{#each input}}
        {{> ../InputWithLabel/template.handlebars inputType=type Id=id placeholder=placeholder className=className name=name}}
    {{/each}}
</div>`

export default Handlebars.compile(template);
