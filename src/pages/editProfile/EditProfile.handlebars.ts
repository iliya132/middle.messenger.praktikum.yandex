const template = `<div id="editProfileContainer">
    <div class="prevent-out-clicks"></div>
    <div class="centered-container profile-container modal" >
        <h2>Profile settings</h2>
        <div class="mb-2">
            <img src="{{{imgUrl}}}" id="avatar" class="img-centered img-circle clickable avatar-sm">
            <form id="avatarForm">
                <input id="file-input" name="avatar" type="file" style="display: none;" />
            </form>
        </div>
        <form id="profileForm">
            <div class="flex-hor">
                <div class="grid c-2-5 gap-3 r-4 input-group">
                        {{#each colOneInputs}}
                            <p>{{title}}</p>
                            <div>
                                {{> ../../components/partials/InputWithLabel/InputWithLabel inputType=type Id=id placeholder=placeholder className="small-input"}}
                            </div>
                        {{/each}}
                </div>
                <div class="grid c-2-5 gap-3 r-4 input-group">
                    {{#each colTwoInputs}}
                            <p>{{title}}</p>
                            <div>
                                {{> ../../components/partials/InputWithLabel/InputWithLabel inputType=type Id=id placeholder=placeholder className="small-input"}}
                            </div>
                        {{/each}}
                </div>
            </div>
            <div class="m-hor-2 mt-xl mb-2"  style="padding: 20px;">
                <a class="link-primary red" id="logout">Выйти</a>
                <div style="float:right" class="">
                    <button class="button-primary" type="button" id="cancelBtn">Cancel</button>
                    <button class="button-primary" type="submit">Save</button>
                </div>
            </div>
        </form>
    </div>
</div>`

export default Handlebars.compile(template);
