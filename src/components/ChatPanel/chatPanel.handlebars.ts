const template = `<div class="chat-info" id={{chatId}}>
    <img class="img-circle avatar" src="{{avatar}}">
    <div class="chat-description">
        <span class="chat-header">{{title}}</span>
        <span class="chat-short">{{lastMsg}}</span>
    </div>
    <button class="chat-options-toggler hidden" id={{togglerId}} title="Show options"><span data-testid="down"
            data-icon="down" class=""><svg viewBox="0 0 19 20" width="19" height="20" class="">
                <path fill="currentColor" d="M3.8 6.7l5.7 5.7 5.7-5.7 1.6 1.6-7.3 7.2-7.3-7.2 1.6-1.6z"></path>
            </svg></span></button>
</div>`

export default Handlebars.compile(template);
