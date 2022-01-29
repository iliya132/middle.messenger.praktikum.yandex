import Handlebars from "handlebars";

const template = `<input type="{{inputType}}" id="{{Id}}" placeholder="{{placeholder}}" name="{{name}}" {{#if className}}
    class="{{className}}" {{/if}} {{#if autocomplete}} autocomplete="{{autocomplete}}" {{/if}}>
<label class="error-label" for="{{Id}}"></label>`

export default Handlebars.compile(template);
