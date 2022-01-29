import Handlebars from "handlebars";

const template = `<div class="centered-container register-container text-centered">
    <h2>Welcome to community!</h2>
    <form>
        <div class="input-group">
            {{> InputGroup}}
                {{#if error}}
                    <br>
                    <span style="color: red">{{error}}</span><br/>
                {{/if}}
           <br>
           {{> Link href="/" Caption="Already has account?" Css="mt-1" id="Login"}}
           <br>
           <button class="button-primary mt-1 mb-1">Sign up</button>
        </div>
    </form>
</div>`

export default Handlebars.compile(template);
