;(function ($, window, document, undefined) {
    var $win = $(window);
    var $doc = $(document);


    $doc.ready(function () {

        $('.project').magnificPopup({
            delegate: 'a',
            type: 'image',
            tLoading: 'Loading image #%curr%...',
            mainClass: 'mfp-img-mobile',
            gallery: {
                enabled: true,
                navigateByImgClick: true,
                preload: [0,1] // Will preload 0 - before current, and 1 after the current image
            },
            image: {
                tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
                titleSrc: function(item) {
                    return item;
                }
            }
        });


        $('.video__placeholder, .video__button').on('click', function() {
            if ( !$('#video-player').length ) {
                var video = '<iframe id="video-player" src="' + $('.video__placeholder').attr('data-video') + '" frameborder="0" allowfullscreen wmode="opaque"></iframe>';
                $(video).insertAfter( $('.video__placeholder') );
                $('.video__button').addClass('is-playing');
            } else {
                $('.video__button').removeClass('is-playing');
                $('#video-player').remove();
            }
        });

        var $scanlines = $('.scanlines');
        $scanlines
            .children().hide()
            .first().show();
        $('#togglescanlines').on('click', function(e) {
            e.preventDefault();
            $scanlines.toggleClass('scanlines');
        });

        $('.sample-ctrl a').on('click', function(e) {
            e.preventDefault();
            $scanlines
                .children().hide()
                .filter('#'+ $(this).attr('data-ctrl')).show();
        });



        $('#toggle').click(function() {
            $(this).toggleClass('active');
            $('#overlay').toggleClass('open');
        });

        $('a[href*="#"]')
        // Remove links that don't actually link to anything
            .not('[href="#"]')
            .not('[href="#0"]')
            .click(function(event) {
                // On-page links
                if (
                    location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
                    &&
                    location.hostname == this.hostname
                ) {
                    // Figure out element to scroll to
                    var target = $(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                    // Does a scroll target exist?
                    if (target.length) {
                        // Only prevent default if animation is actually gonna happen
                        event.preventDefault();
                        $('html, body').animate({
                            scrollTop: target.offset().top
                        }, 3000, function() {
                            // Callback after animation
                            // Must change focus!
                            var $target = $(target);
                            $target.focus();
                            if ($target.is(":focus")) { // Checking if the target was focused
                                return false;
                            } else {
                                $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
                                $target.focus(); // Set focus again
                            };
                        });
                    }
                }
            });

    });


})(jQuery, window, document);
