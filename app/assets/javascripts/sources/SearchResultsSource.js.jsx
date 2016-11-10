var SearchResultsSource = {
  fetch: function() {
    return new Promise(function(resolve, reject) {
      $.get('/maps/search', {search: FilterStateStore.getState()}, function(response) {
        resolve(response);
      }.bind(this));
    });
  },

  postPin: function(pin_data) {
    console.log("SearchResultSource pin_data", pin_data);

    return new Promise(function(resolve, reject) {
      $.post('/maps', {pin: pin_data}, function(response){
        resolve(response);
      }.bind(this));
    });
  },

  getNearbyLocations: function(latLng) {
    var geocoder = new google.maps.Geocoder();

    return new Promise(function(resolve, reject) {
      geocoder.geocode({location: latLng}, function(results, status) {
        const places = _.chain(results).map(
          function(result) {
            return {result: result, location: _.find(result.address_components, function(ac) {return (ac.types.indexOf("locality")>-1)})}
          }).reject(function(result) {
            return (typeof result.location === "undefined")
          }
        ).value();

        window.geocoded_results = {};
        window.geocoded_results.results = results;
        window.geocoded_results.places = places;

        resolve(places);
      });
    });
  }
}
