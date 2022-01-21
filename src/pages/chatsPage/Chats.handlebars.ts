const template = `<div class="h100 bg-light">
    <div class="container h100 bg-white border-all">
        <div class="grid chats-template h100">
            <div class="chats-header chats-list-template" id="user-info-root">
            </div>
            <div class="grid chats-list-template h100">
                <div class="chats-list h100 border-r" id="chats-list-root">
                </div>
                <div class="chat-view h100" id="messages-root">
                </div>
            </div>
        </div>
    </div>
</div>
{{> ../../components/Partials/ContextMenu/ContextMenu}}`

export default Handlebars.compile(template);
