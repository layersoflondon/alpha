class Places {
  static getNearbyLocations(latLng) {
    const geocoder = new google.maps.Geocoder();

    return new Promise(function(resolve, reject) {
      geocoder.geocode({location: latLng}, function(results, status) {
        window.results = results;
        window.status  = status;
        const places = _.chain(results).map(
          function(result) {
            const location   = _.find(result.address_components, function(ac) {return (ac.types.indexOf("locality")>-1)});

            const pin_result = {
              pins: [
                {
                  id: result.place_id,
                  location: result.formatted_address,
                  content_entry: {title: "GM " + result.formatted_address, resource: {type: "text", "text": result.formatted_address}},
                  position: result.geometry.location.toJSON()
                }
              ],
              position: result.geometry.location.toJSON()
            };

            return pin_result;
          }).reject(function(result) {
            return (typeof result.position === "undefined");
          }
        ).value();

        resolve(places);
      });
    });
  }
}
