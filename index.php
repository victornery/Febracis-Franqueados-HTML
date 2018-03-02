<?php require('templates/html-header.php');?>
<header class="febra-login">
    <div class="container">
        <div class="febra-box febra-box--login">
            <svg viewBox="0 0 160 110" class="febra-svg febra-svg--logo">
                <use href="assets/icons/icons.svg#icon-logo-home"></use>
            </svg>
            <h1 class="febra-title febra-title--medium">Acesso exclusivo para franqueados e parceiros Febracis</h1>
            <form class="febra-form febra-form--login" action="#" method="post">
                <input type="text" name="user" id="user_login" value="" placeholder="Seu usuário ou e-mail">
                <input type="password" name="pass" id="pass_login" value="" placeholder="Senha">
                <div class="febra-form__checkbox">
                    <input type="checkbox" id="remember"> <label for="remember">Lembrar-me</label>
                </div>
            </form>
        </div>
    </div>
</header>
<?php require('templates/html-footer.php');?>