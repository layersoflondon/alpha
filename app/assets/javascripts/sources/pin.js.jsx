class Pin {
  static fetch(filters) {
    return new Promise((resolve, reject) => {
      $.get("/maps/search", {search: filters}).done((response) => {
        resolve(response)
      }).fail((response) => {
        console.log("FAIL", response);
        reject(response);
      });
    });
  }

  static post(state) {
    var fromDate = null;
    var fromDate = moment(`${state.date_from_year}-${state.date_from_month == "" ? 1 : state.date_from_month}-${state.date_from_day == "" ? 1 : state.date_from_day}`).format();
    var toDate = null;
    if (state.date_to_year !== "" || state.date_to_month !== "" || state.date_to_day !== "") {
      toDate = moment(`${state.date_to_year}-${state.date_to_month == "" ? 1 : state.date_to_month}-${state.date_to_day == "" ? 1 : state.date_to_day}`).format();
    }
    //here's what Rails expects:
    // title: "foo", lat: 0, lng: 0, date_from: DateTime.now, user: User.first, pin_content_entry_attributes: {content_entry_attributes: {content_type: ContentType.first, tileserver_url: "foo"}}

    // here are the fields on a ContentEntry in the backend:
    // ["id", "content_type_id", "attached_file_id", "attached_file_filename", "attached_file_size", "attached_file_content_type", "url", "content", "attribution", "data", "created_at", "updated_at", "tileserver_url"]

    const pinData = {
      pin: {
        title: state.title,
        description: state.description,
        //   geocoding TODO - fix up
        location: state.location,
        date_from: fromDate,
        date_to: toDate,
        lat: state.pin_form_lat_lng.lat,
        lng: state.pin_form_lat_lng.lng,
        link_url: state.link_url,

        pin_content_entry_attributes: {
          content_entry_attributes: {
            content: state.content,
            video_url: state.video_url,
            attribution: state.attribution,
            content_type_id: state.pin_type,
            attached_file: state.attached_file
          }
        }
      }
    };

    return new Promise(function(resolve, reject) {
      $.post("/maps", pinData).done((response) => {
        resolve(response);
      }).fail((response) => {
        reject(response);
      })
    });
  }

  static getNearbyLocations(latLng) {
    geocoder = new google.maps.Geocoder();

    return new Promise(function(resolve, reject) {
      geocoder.geocode({location: latLng}, function(results, status) {
        const places = _.chain(results).map(
          function(result) {
            return {result: result, location: _.find(result.address_components, function(ac) {return (ac.types.indexOf("locality")>-1)})}
          }).reject(function(result) {
            return (typeof result.location === "undefined")
          }
        ).value();

        resolve(places);
      });
    });
  }
}
