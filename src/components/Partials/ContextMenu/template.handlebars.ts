const template = `<div class="popup hidden" id="context-popup">
    <div class="context-menu">
        {{#each options}}
        <span id={{id}}>{{name}}</span>
        {{/each}}
    </div>
</div>`

export default Handlebars.compile(template);
