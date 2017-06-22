$(function() {
  $(".m-search-panel .free-text input[type=text]").focus();
  $('.m-search-panel .results').css('max-height', ($(window).height() - 170) + 'px');
  $('.m-collections-list .collections-popout').css('max-height', ($(window).height() - 170) + 'px');

});

