// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs

//= require lodash

//= require react-with-addons
//= require react-dom
//= require react_ujs
//= require react-tabs

//= require leaflet
//= require vendor/react-leaflet
//= require moment

//= require vendor/blueimp-helper
//= require vendor/blueimp-gallery.min
//= require vendor/blueimp-gallery-video
//= require vendor/blueimp-gallery-youtube
//= require vendor/blueimp-gallery-vimeo

//= require alt
//= require layers
//= require components

//= require_self
//= require_tree .

//= require parsley.min

var LoL = {};
var alt = new Alt();

$(document).ready(() => {
  $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
    jqXHR.setRequestHeader('X-CSRF-Token', $("meta[name=csrf-token]").attr('content'));
  });
});