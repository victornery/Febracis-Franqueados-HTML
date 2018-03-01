<?php get_template_part('templates/html','head'); ?>
    <header class="ae-header animated fadeIn">
        <div class="container">
            <div class="ae-header__bloco-flex"> 
                <div class="ae-redes">
                    <a href="https://www.facebook.com/avalengenharia1/" title="Facebook" target="_blank"><i class="fa fa-facebook" aria-hidden="true"></i></a>
                    <a href="https://www.linkedin.com/company/aval-engenharia" title="Instagram" target="_blank"><i class="fa fa-instagram" aria-hidden="true"></i></a>
                    <a href="https://www.instagram.com/?hl=pt-br" title="Linkedin" target="_blank"><i class="fa fa-linkedin" aria-hidden="true"></i></a>
                    <a href="https://www.youtube.com/channel/UCdtS8i18HzwGKkQDpe0aLSA" title="Youtube" target="_blank"><i class="fa fa-youtube" aria-hidden="true"></i></a>
                </div>
                <a href="<?php echo get_bloginfo('url'); ?>" class="ae-header__logo">
                    <img src="<?php echo get_template_directory_uri(); ?>/assets/images/logo-header.png" alt="">
                </a>
                <div class="ae-header__mobile-btns">
                    <a href="#" class="btn btn--transparent"><i class="icon icon--user"></i>Área do Cliente</a>
                </div>
            </div>
             <a href="#menu" class="ae-menu__toggle"><div><span></span></div></a>

        <?php  wp_nav_menu( array(
            'theme_location'  => 'menu_1',
            'menu_class'      => 'ae-header__nav ',
            'container_class' => 'ae-header__menu'.$css.'')); ?>
        </div>
    </header>
    

    






