export default `
    <input type="{{inputType}}" id="{{Id}}" placeholder="{{placeholder}}" 
    name="{{name}}"
    {{#if className}}
        class="{{className}}"
    {{/if}}
    {{#if autocomplete}}
    autocomplete="{{autocomplete}}"
    {{/if}}
    >
    <label class="error-label" for="{{Id}}"></label>
`;
