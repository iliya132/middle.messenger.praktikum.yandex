export default `<div class="centered-container text-centered">
    <h2>Please login to continue</h2>
    <form>
        <div class="input-group">
            {{>InputGroup}}
            <button class="button-primary mt-2">Sign in</button>
            <br>
            {{>Link Caption="Sign up" Css="mt-1" href="/src/pages/register/register.html"}}
        </div>
    </form>
</div>`;