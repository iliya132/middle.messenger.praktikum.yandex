import Handlebars from 'handlebars';

const template = `
<div class="chat-messages">
    <div class="messages h100">
        {{#each messages}}
            <div class="{{type}}">
                <span>{{content}}</span>
            </div>
        {{/each}}
    </div>
</div>
`;

export default template;
export const templateCompiled = Handlebars.compile(template);
