export default `
<div class="centered-container register-container text-centered">
    <h2>Welcome to community!</h2>
    <form>
        <div class="input-group">
            {{>InputGroup}}
           <br>
           {{>Link href="/src/pages/login/login.html" Caption="Already has account?" Css="mt-1"}}
           <br>
           <button class="button-primary mt-1">Sign up</button>
        </div>
    </form>
</div>`;