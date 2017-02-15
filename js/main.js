
$(document).ready(function() {

    // $('.options-wrapper a').smoothScroll();

    var range = 100;
    var stickyNavTop = $('.main-navmenu').offset().top;

    var stickyNav = function(){
        var scrollTop = $(window).scrollTop();
        // var sticky = false;

        if (scrollTop > stickyNavTop) {
            $('.movable-header').addClass('bar-sticky');
        } else {
            $('.movable-header').removeClass('bar-sticky');
        }

        var header = $('.movable-header')
        var offset = header.offset().top;
        var height = header.outerHeight();
        offset = offset + height / 2;
        var calc = 1 - (stickyNavTop - window.scrollY) / stickyNavTop;
        if(calc > 1)
        {
            calc = 1;
        }
        else if(calc < 0)
        {
            calc = 0;
        }
        header.css('background-color', function(){
            return $.Color(51, 51, 51, calc)
        });

    };

    stickyNav();

    $(window).scroll(function() {
        stickyNav();
    });

    window.setTimeout(function(){
        $(window).resize();
    },500);

    var timer;
    $(window).bind('resize', function() {
        clearTimeout(timer);
        timer = setTimeout(function(){ $(window).resize(); }, 250);
    });

    jQuery(window).trigger('resize').trigger('scroll');

    setTimeout(function() {
    jQuery(window).trigger('resize').trigger('scroll');
}, 500); // wait 500ms

});