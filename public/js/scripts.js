/*
* ----------------------------------------------------------------------------------------
Author       : DuezaThemes
Template Name: APPLICANT - Personal CV/Resume Template
Version      : 1.0
* ----------------------------------------------------------------------------------------
*/

(function ($) {
    'use strict';
    
    function selector_cache() {
        var collection = {};

        function get_from_cache( selector ) {
            if ( undefined === collection[ selector ] ) {
                collection[ selector ] = $( selector );
            }
            return collection[ selector ];
        }
        return { get: get_from_cache };
    }

    jQuery(document).ready(function () {
        var selectors = new selector_cache();

        /*
         * ----------------------------------------------------------------------------------------
         *  PRELOADER JS
         * ----------------------------------------------------------------------------------------
         */
        selectors.get( window ).on('load', function () {
            $('.preloader').fadeOut();
            $('.preloader-area').delay(350).fadeOut('slow');
        });


        /*
         * ----------------------------------------------------------------------------------------
         *  CHANGE MENU BACKGROUND JS
         * ----------------------------------------------------------------------------------------
         */
        selectors.get( window ).on('scroll', function () {
            if (selectors.get( window ).scrollTop() > 200) {
                $('.header-top-area').addClass('menu-bg');
            } else {
                $('.header-top-area').removeClass('menu-bg');
            }
        });


        /*
         * ----------------------------------------------------------------------------------------
         *  PROGRESS BAR JS
         * ----------------------------------------------------------------------------------------
         */
        selectors.get('.progress-bar > span').each(function () {
            var $this = $(this);
            var width = $(this).data('percent');
            $this.css({
                'transition': 'width 3s'
            });
            setTimeout(function () {
                $this.appear(function () {
                    $this.css('width', width + '%');
                });
            }, 500);
        });


        /*
         * ----------------------------------------------------------------------------------------
         *  SMOTH SCROOL JS
         * ----------------------------------------------------------------------------------------
         */
        selectors.get( 'a.smoth-scroll' ).on("click", function (e) {
            var anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $(anchor.attr('href')).offset().top - 50
            }, 1000);
            e.preventDefault();
        });
        

        /*
         * ----------------------------------------------------------------------------------------
         *  PORTFOLIO JS
         * ----------------------------------------------------------------------------------------
         */

        selectors.get('.work-inner').mixItUp();
        

        /*
         * ----------------------------------------------------------------------------------------
         *  MAGNIFIC POPUP JS
         * ----------------------------------------------------------------------------------------
         */
        selectors.get( '.work-popup' ).magnificPopup({
            type: 'image',
            gallery: {
                enabled: true
            }

        });
        
        
        /*
         * ----------------------------------------------------------------------------------------
         *  PARALLAX JS
         * ----------------------------------------------------------------------------------------
         */
        selectors.get( window ).stellar({
            responsive: true,
            positionProperty: 'position',
            horizontalScrolling: false
        });
        

        /*
         * ----------------------------------------------------------------------------------------
         *  COUNTER UP JS
         * ----------------------------------------------------------------------------------------
         */

        selectors.get('.counter-num').counterUp();


        /*
         * ----------------------------------------------------------------------------------------
         *  TESTIMONIAL JS
         * ----------------------------------------------------------------------------------------
         */

        selectors.get(".reference-list").owlCarousel({
            items: 1,
            autoPlay: true,
            navigation: false,
            itemsDesktop: [1199, 1],
            itemsDesktopSmall: [980, 1],
            itemsTablet: [768, 1],
            itemsTabletSmall: false,
            itemsMobile: [479, 1],
            pagination: true,
            autoHeight: true,
        });


        /*
         * ----------------------------------------------------------------------------------------
         *  EXTRA JS
         * ----------------------------------------------------------------------------------------
         */
        $(document).on('click', '.navbar-collapse.in', function (e) {
            if ($(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle') {
                $(this).collapse('hide');
            }
        });
        $('body').scrollspy({
            target: '.navbar-collapse',
            offset: 195
        });
        

        /*
         * ----------------------------------------------------------------------------------------
         *  SCROOL TO UP JS
         * ----------------------------------------------------------------------------------------
         */
        selectors.get( window ).on('scroll', function () {
            if ($(this).scrollTop() > 250) {
                $('.scrollup').fadeIn();
            } else {
                $('.scrollup').fadeOut();
            }
        });
        $('.scrollup').on("click", function () {
            $("html, body").animate({
                scrollTop: 0
            }, 800);
            return false;
        });
        

        /*
         * ----------------------------------------------------------------------------------------
         *  WOW JS
         * ----------------------------------------------------------------------------------------
         */
        new WOW().init();
    });

})(jQuery);