export default `
<div class="centered-container profile-container">
        <h2>Profile settings</h2>
        <div class="mb-2">
            <img src="{{{imgUrl}}}" id="avatar" class="img-centered img-circle clickable" onclick="document.getElementById('file-input').click();"
                width="90px" height="90px">
            <input id="file-input" type="file" name="name" style="display: none;" />
        </div>
        <form>
            <div class="grid c-2 m-hor-2">
                <div class="grid c-2-5 r-4 input-group">
                        {{#each colOneInputs}}
                            <p class="mrg-0 mt-25p">{{title}}</p>
                            {{>InputWithLabel inputType=type Id=id placeholder=placeholder className="small-input"}}
                        {{/each}}
                </div>
                <div class="grid c-2-5 r-4 input-group">
                    {{#each colTwoInputs}}
                            <p class="mrg-0 mt-25p">{{title}}</p>
                            {{>InputWithLabel inputType=type Id=id placeholder=placeholder className="small-input"}}
                        {{/each}}
                </div>
            </div>
            <div class="m-hor-2 mt-xl mb-2">
                <a class="link-primary red" href="#">Выйти</a>
                <div style="float:right" class="">
                    <button class="button-primary">Cancel</button>
                    <button class="button-primary">Save</button>
                </div>
            </div>
        </form>
    </div>
`;