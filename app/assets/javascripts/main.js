$(function() {
  $(".m-search-panel .free-text input[type=text]").focus();
  //console.log(($(window).height() - 100) + 'px');

  $('.m-search-panel .results').css('max-height', ($(window).height() - 170) + 'px');

});

