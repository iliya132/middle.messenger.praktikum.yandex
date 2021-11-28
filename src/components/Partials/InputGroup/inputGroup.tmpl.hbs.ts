export default `<div class="input-group">
        {{#each input}}
            {{>InputWithLabel inputType=type Id=id placeholder=placeholder className=className name=name}}
        {{/each}}
</div>`;