$(document).on('ready', () => {
  $(".m-search-panel .free-text input[type=text]").focus();
  //console.log(($(window).height() - 100) + 'px');

  $('.m-search-panel .results').css('max-height', ($(window).height() - 170) + 'px');

})


// $( document ).ready(function() {
//
// 	$('.range-slider').jRange({
// 		from: 1716,
// 		to: 2016,
// 		step: 1,
// 		scale: [1716,2016],
// 		format: '%s',
// 		width: 250,
// 		showLabels: true,
// 		isRange : true
// 	});
//
// 	$('.m-panels > .tabs li').each(function(index) {
// 		$(this).attr('data-panel', 'panel-id-' + index);
// 		$(this).click(function(e) {
// 			$('.m-panels > div').hide();
// 			$('.m-panels > div#' + $(this).attr('data-panel')).show();
// 			$('.m-panels > .tabs li').removeClass('is-current');
// 			$(this).addClass('is-current');
// 			e.preventDefault();
// 		});
// 	});
//
// 	$('.m-panels > div').each(function(index) {
// 		$(this).attr('id', 'panel-id-' + index);
// 		$(this).hide();
// 	});
//
// 	$('.m-panels > div#panel-id-1').show();
// 	$('.m-panels > .tabs li[data-panel="panel-id-1"]').addClass('is-current');
//
// 	// Filters
//
// 	$('.m-filters .advanced').hide();
//
// 	$('.m-filters .show-filter-link-advanced').click(function(e) {
// 		$('.m-filters .basic').hide();
// 		$('.m-filters .advanced').show();
// 		e.preventDefault();
// 	});
//
// 	$('.m-filters .show-filter-link-basic').click(function(e) {
// 		$('.m-filters .advanced').hide();
// 		$('.m-filters .basic').show();
// 		e.preventDefault();
// 	});
//
// 	// Add pin
//
// 	$('.m-add-pin input[type="submit"]').click(function(e) {
// 		$('.m-add-pin').hide();
// 	});
//
// 	$('.m-add-pin').hide();
//
// 	$('.m-controls .add-pin button').click(function(e) {
// 		$('.m-add-pin').show();
// 	});
//
// 	// Collections
//
// 	$('.m-collections-panel .detail').hide();
//
// 	$('.m-collections-panel .list a').click(function(e) {
// 		$('.m-collections-panel .list').hide();
// 		$('.m-collections-panel .detail').show();
// 	});
//
// 	$('.m-collections-panel .detail .back').click(function(e) {
// 		$('.m-collections-panel .list').show();
// 		$('.m-collections-panel .detail').hide();
// 	});
//
// });
