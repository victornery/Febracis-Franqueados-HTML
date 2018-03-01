/*=========================================================================================
// INICIO MAIN JS
========================================================================================= */

jQuery(function($) {
    $(document).ready(function() {

        $("#slider").animate({
            "animation:": " animateBg forwards 2s ease-in"

        }, 2000);

        $(window).scroll(function() {
            if ($(this).scrollTop() > 100) {
                $('.ae-menu__toggle').addClass("mobile-sticky");
            } else {
                $('.ae-menu__toggle').removeClass("mobile-sticky");
            }
        });

        /*=========================================================================================
        // MENU TOOGLE
        =========================================================================================*/

        //Contador

        //var topNumbers = $(".ae-apps").offset().top;
        var acabouAnimate = false;

        // $(window).scroll(function() {
        var xscroll = $(window).scrollTop();
        var hasFinished = $(this).attr('data-animate-finished', true);
        var hasAttrFinish = $(this).attr('data-animate-finished', false);

        //  if (xscroll > (topNumbers)) {
        $('.ae-counter').each(function() {
            $(this).prop('Counter', 0).animate({
                Counter: $(this).text()
            }, {
                duration: 3000,
                easing: 'swing',
                step: function(now) {
                    $(this).text(Math.ceil(now));
                },
                complete: function() {
                    $(this).attr('data-animate-finished', true);
                },
                done: function() {
                    if ($(this).attr('data-animate-finished', true)) {
                        $(this).stop();
                        acabouAnimate = true;
                    }
                },
            });
        });
        //}
        // });

        // menu-toggle
        $(".ae-menu__toggle").click(function(event) {
            event.preventDefault();
            if ($(this).hasClass('on')) {
                $(this).removeClass('on');
                $(".ae-header__menu").stop().fadeOut();
            } else {
                $(this).addClass('on');
                $(".ae-header__menu").stop().fadeIn();
            }
        });

        $(".slider__btnMobile").click(function(event) {
            event.preventDefault();
            $(this).addClass('.slider__btnMobileOn');
        });

        $('.btn-resp-rdp').on('click', function(e) {
            e.preventDefault();

            if ($(this).text() == "Exibir Menu") {
                $(this).text("Ocultar Menu");
            } else {
                $(this).text("Exibir Menu");
            }

            $(".ae-footer__menu").slideToggle();
        });

        // set carousel
        var win = $(window);
        var cardsHotel = $('#clientes');
        var item = $('.ae-carousel-solution__item');
        var cardsSolucao = $('#solution');

        function initOwlEffect(ef) {
            ef.addClass('hvr-grow');
        }

        function initOwl(el) {
            el.addClass('owl-carousel');

            el.owlCarousel({
                items: 1,
                nav: false,
                dots: true,
                navText: false,
                margin: 5,
                autoWidth: false,
            });
        }

        function destroyOwl(el) {
            el.removeClass('owl-carousel');
            el.trigger('destroy.owl.carousel');
        }

        function destroyOwlEffect(ef) {
            ef.removeClass('hvr-grow');
            ef.trigger('hvr-grow');
        }

        function hasSmallScreen() {
            return (win.width() < 568) ? initOwl(cardsHotel) : destroyOwl(cardsHotel);
        }

        function hasSmallScreenEf() {
            return (win.width() >= 768) ? initOwlEffect(item) : destroyOwlEffect(item);
        }
        win.on('resize load', hasSmallScreen);
        win.on('resize load', hasSmallScreenEf);


        function initOwlC(ele) {
            ele.addClass('owl-carousel');

            ele.owlCarousel({
                items: 1,
                nav: false,
                dots: true,
                navText: false,
                margin: 5,
                autoWidth: false,
            });
        }

        function destroyOwlC(ele) {
            ele.removeClass('owl-carousel');
            ele.trigger('destroy.owl.carousel');
        }

        function hasSmallScreenC() {
            return (win.width() < 568) ? initOwlC(cardsSolucao) : destroyOwlC(cardsSolucao);
        }

        win.on('resize load', hasSmallScreenC);

        $(".menu__nav").mouseenter(function() {
            $(".menu-item").addClass(".sub-menu");
        });

        var botao = $('#rodape-button');

        botao.click(function() {
            if (botao.hasClass('on')) {
                $('.rodape__content').fadeOut(500);
                botao.removeClass('on');
                botao.html('Exibir menu');
            } else {
                $('.rodape__content').fadeIn(500);
                botao.addClass('on');
                botao.html('Esconder menu');
            }
        });

        // Mudar nome inicial dos forms
        $(".ae-form__grid .cidade").find('option:first').html('Cidade*');
        $(".ae-form__grid .estado").find('option:first').html('Estado*');
        $("input[type='tel']").mask("(99) 9999-99999");

        //Scroll action

        function menuScroll(menu, offset) {
            var menuFixo = $(menu);
            var $offset = $(offset);

            if ($offset.length == 0) return

            var fixaAqui = $offset.offset().top;

            $(window).scroll(function() {
                var scroll = $(window).scrollTop();
                if (scroll >= fixaAqui) {
                    menuFixo.addClass('is-fixed animated fadeInDown');
                } else {
                    menuFixo.removeClass('is-fixed animated fadeInDown');
                }
            });
        }

        menuScroll('.ae-header--interna', '.ae-solucao');

        // AJAX CONTENT
        ajaxContent($('.filtro-simples__link.active'));
        $('#ajax-content').addClass('ajax-load');

        $("[data-ajax='gal']").click(function(e) {
            $("[data-ajax='gal']").removeClass('active');
            $(this).addClass('active');

            e.preventDefault();
            ajaxContent(this);

            $('#ajax-content').addClass('ajax-load');
        });

        function ajaxContent(link) {
            $link = $(link).attr('href');
            $target = $(link).data('ancora');

            $("#ajax-content").load($link + ' #' + $target, function() {
                $(this).removeClass('ajax-load');
            });
        }


        /*=========================================================================================
        // =Altura
        ========================================================================================= */

        function equalizeHeights(selector) {
            var heights = new Array();

            // Loop to get all element heights
            $(selector).each(function() {

                // Need to let sizes be whatever they want so no overflow on resize
                $(this).css('min-height', '0');
                $(this).css('max-height', 'none');
                $(this).css('height', 'auto');

                // Then add size (no units) to array
                heights.push($(this).height());
            });

            // Find max height of all elements
            var max = Math.max.apply(Math, heights);

            // Set all heights to max height
            $(selector).each(function() {
                $(this).css('height', max + 'px');
            });
        }


        $(window).on('load resize', function() {
            // equalizeHeights('.ae-consultoria__lista-item');
            // equalizeHeights('.ae-pag-portfolio__lista-legend');
            //equalizeHeights('.malls__icones');
        });



        /*=========================================================================================
        // OWL
        ========================================================================================= */

        $("#banner").owlCarousel({
            items: 1,
            nav: false,
            dots: true,
            loop: true,
            margin: 0,
            autoplay: true,
            autoplayTimeout: 8000,
            autoplayHoverPause: true,
            //navText: false,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 1,
                    nav: true
                },
                1000: {
                    items: 1,
                    nav: true
                }
            }

        });

        $("#numeros").owlCarousel({
            items: 1,
            nav: false,
            dots: false,
            loop: true,
            margin: 0,
            autoplay: true,
            autoplayTimeout: 8000,
            autoplayHoverPause: true,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 3,
                    nav: true
                },
                1000: {
                    items: 5,
                    nav: false,
                    loop: false
                }
            }

        });

        $("#depositions").owlCarousel({
            items: 1,
            nav: true,
            dots: true,
            loop: true,
            margin: 0,
            autoplay: false,
            autoplayTimeout: 2500,
            autoplayHoverPause: true,
            //navText: false,
            responsive: {
                0: {
                    items: 1,
                    nav: false
                },
                600: {
                    items: 2,
                    nav: false
                },
                1000: {
                    items: 3,
                    nav: false,
                    dots: true
                }
            }

        });
        $("#client").owlCarousel({
            items: 1,
            nav: true,
            dots: true,
            loop: true,
            margin: 0,
            autoplay: false,
            autoplayTimeout: 2500,
            autoplayHoverPause: true,
            //navText: false,
            responsive: {
                0: {
                    items: 1,
                    nav: false
                },
                600: {
                    items: 4,
                    dots: false
                },
                1000: {
                    items: 6,
                    dots: false
                }
            }

        });


        /*=========================================================================================
        // YOUTUBE VIDEO
        =========================================================================================*/

        $('.open-popup-video').magnificPopup({
            //para ativar para todos os links de um bloco, use delegate
            //delegate: 'a',
            type: 'inline',
            removalDelay: 300, //delay removal by X to allow out-animation
            callbacks: {
                beforeOpen: function() {
                    var video = this.st.el.attr('data-video'),
                        html = '<div class="youtube__iframe"><iframe width="560" height="315" src="https://www.youtube.com/embed/' + video + '?autoplay=1&rel=0" frameborder="0" allowfullscreen></iframe></div>';

                    $(this.st.el.attr('href')).html(html).fadeIn(1000);
                    this.st.mainClass = this.st.el.attr('data-effect');
                },
                close: function() {
                    $(this.st.el.attr('href')).html('');
                }
            },
            midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
        });

        /*=========================================================================================
        // LABEL UP LOGIN
        =========================================================================================*/

        function filterLabel() {
            var $label = $('#loginform .input, .form__input .input, #form-cadastro .input');

            $label.filter(function(e, item) {
                if ($(item).val() != '') {
                    labelUp($(item).parent().find('label'));
                }
            });

            $label.on('click focus', function(el) {
                var label = $(this).parent().find('label');
                labelUp(label);
            });

            $label.on('focusout', function(el) {
                var $input = $(this);
                var pai = $input.parent();
                var label = $input.parent().find('label');

                if ($input.val() == '') {
                    removeStyle(label);
                }
            });
        }

        function labelUp(target) {
            target.css({
                'font-size': '10px',
                'top': '4px',
            });
        }

        function focusLabel(target, color) {
            target.css({
                'border-color': color,
            });
        }

        function removeStyle(target) {
            target.removeAttr('style');
        }

        filterLabel();

        function msgError(el, msg) {
            focusLabel(el.parent(), '#e74c3c');
            $('<span class="msg">' + msg + '</span>').appendTo(el.parent());
        }


        /*=========================================================================================
        // LAZY
        =========================================================================================*/

        var bLazy = new Blazy({
            offset: 0, // Loads images 100px before they're visible
            error: function(ele) {
                var original = ele.getAttribute('data-src');
                ele.src = original;
            }
        });

        function init() {
            var imgDefer = document.getElementsByClassName('img-defer');
            for (var i = 0; i < imgDefer.length; i++) {
                if (imgDefer[i].getAttribute('data-src')) {
                    imgDefer[i].setAttribute('src', imgDefer[i].getAttribute('data-src'));
                }
            }
        }

        window.onload = init;

        /*=========================================================================================
        // EQUAL HEIGHT
        =========================================================================================*/
        function equalizeHeights(selector) {
            var heights = new Array();

            // Loop to get all element heights
            $(selector).each(function() {

                // Need to let sizes be whatever they want so no overflow on resize
                $(this).css('min-height', '0');
                $(this).css('max-height', 'none');
                $(this).css('height', 'auto');

                // Then add size (no units) to array
                heights.push($(this).height());
            });

            // Find max height of all elements
            var max = Math.max.apply(Math, heights);

            // Set all heights to max height
            $(selector).each(function() {
                $(this).css('height', max + 'px');
            });
        }

        $(window).on('load resize', function() {
            equalizeHeights('.news__content');
        });

        // GALERIA EMPREENDIMENTOS
        var $gal = $('.open-galeria');
        // console.log($gal);
        $gal.on('click', function(e) {
            e.preventDefault();

            $(this).parent().find('.status-obra__galeria a:eq(0)').trigger('click');
        });

        $gal.each(function(event) {
            $(this).parent().find('.status-obra__galeria').magnificPopup({
                delegate: 'a',
                type: 'image',
                gallery: {
                    enabled: true
                }
            });
        });

        $('.open-modal').magnificPopup({
            removalDelay: 500,
            callbacks: {
                beforeOpen: function() {
                    this.st.mainClass = this.st.el.attr('data-effect');
                },
                close: function() {
                    resetForm();
                }
            },
            midClick: true
        });

        function resetForm() {
            var form = $('.wpcf7-form');
            var input = form.find('input');
            var msg = form.find('.wpcf7-response-output');

            form.removeClass('invalid sucess');
            input.removeClass('wpcf7-not-valid');
            msg.hide();
        }


        /*=========================================================================================
        // CLOSE FUNCTION
        =========================================================================================*/
    });

});