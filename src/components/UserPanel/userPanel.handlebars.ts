import Handlebars from "handlebars";

const template = `<div class="chat-info user-info">
    <img class="img-circle avatar" src="{{{avatarSrc}}}">
    <div class="chat-description">
        <span class="chat-header">{{userName}}</span>
    </div>
    {{#if showMore}}
    <button class="no-style edit-profile-btn" id="editProfile">
        <img src="{{{showMoreSrc}}}" class="edit-profile-img">
    </button>
    {{/if}}
</div>`

export default Handlebars.compile(template);
