class Places {
  static getNearbyLocations(search_params) {
    console.log(search_params);

    const places_search = new google.maps.places.PlacesService(document.createElement('div'));

    return new Promise((resolve, reject) => {
      places_search.nearbySearch(search_params, (results, status, code) => {
        console.log(results);
        window.results = results;

        const places = _.chain(results.slice(0, 10)).map((result) => {
          let pin_result = {
            pins: [{
              id: result.place_id,
              title: result.name,
              location: result.vicinity,
              content_entry: {title: result.name},
              position: result.geometry.location.toJSON()
            }],
            position: result.geometry.location.toJSON()
          };

          if(result.photos && result.photos.length) {
            pin_result.pins[0].content_entry.resource = {
              type: "image",
              image_path: result.photos[0].getUrl({maxWidth: 1400, maxHeight: 1000}).replace(/https?:/, ''),
              content_type: "image/jpeg"
            }
          }

          return pin_result;
        }).value();

        resolve(places);
      });
    });
  }
}
