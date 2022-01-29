import Handlebars from "handlebars";

const template = `<div class="centered-container text-centered">
    <h2>Please login to continue</h2>
    <form>
        <div class="input-group">
            {{> InputGroup}}
            {{#if error}}
                <br>
                <span style="color: red">{{error}}</span><br/>
            {{/if}}
            <button class="button-primary mt-2">Sign in</button>
            <br>
            {{> Link Caption="Sign up" Css="mt-1" href="/sign-up" id="signUpLink"}}
        </div>
    </form>
</div>`

export default Handlebars.compile(template);
