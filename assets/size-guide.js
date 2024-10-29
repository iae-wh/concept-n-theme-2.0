jQuery(document).ready(function ($) {
  $('.btn_size_guide').on('click', function () {
    $('.content_size_guide').addClass('active');
    $('.js_sticky').removeClass('sticky_content');
    $('.ciloe-size-guide-overlay').addClass('active');
  });
  $('.ciloe-size-guide-overlay').on('click', function () {
    $('.content_size_guide').removeClass('active');
    $('.ciloe-size-guide-overlay').removeClass('active');
  });
  $('.close_size_guide').on('click', function () {
    $('.js_sticky').addClass('sticky_content');
    $('.content_size_guide').removeClass('active');
    $('.ciloe-size-guide-overlay').removeClass('active');
  });
});
