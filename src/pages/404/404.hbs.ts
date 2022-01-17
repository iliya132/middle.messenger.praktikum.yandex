export default `<style>
        .img-centered {
            width: 214px;
            height: 242px;
            display: block;
            margin: 0 auto;
        }

        .link {
            display: block;
            text-decoration: none;
            font-size: 16px;
            font-style: normal;
            font-weight: normal;
            line-height: 19px;
            margin: 0 auto;
            text-align: center;
        }
    </style>
    <div class="centered-container">
        <h2>There is nothing on this page!</h2>
        <p class="text-silenced text-centered">The page you are looking for doesn't exist.</p>
        <p class="text-silenced text-centered">For now look at this cat. Then go back to site.</p>
        <img class="img-centered" id="image">
        <a class="link" href="javascript:history.back()">Go back to site</a>
    </div>`;