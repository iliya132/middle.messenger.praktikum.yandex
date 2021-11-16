export default `{{#if Css}}
    <a class="link-primary {{Css}}" href="{{{href}}}">{{Caption}}</a>
{{else}}
    <a class="link-primary" href="{{{href}}}">{{Caption}}</a>
{{/if}}`;