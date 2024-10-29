jQuery(document).ready(function ($) {
    const footer_title = $('.js-menu-mobile .title_footer');

    footer_title.each(function() {
        $(this).on('click', function () {
            $(this).toggleClass('active');
            $(this).next('.list-link').toggleClass('active');
        });
    });
});
