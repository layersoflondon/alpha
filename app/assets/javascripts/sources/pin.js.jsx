class Pin {
  static fetch(filters) {
    return new Promise(function(resolve, reject) {
      $.get('/maps/search', {search: filters}, (response) => {
        resolve(response);
      });
    });
  }

  static post(data) {
    console.log("SearchResultSource pin_data", data);

    return new Promise(function(resolve, reject) {
      $.post('/maps', {pin: data}, (response) => {
        resolve(response);
      });
    });
  }

  static getNearbyLocations(latLng) {
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