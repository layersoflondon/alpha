class Pin {
  static fetch(filters) {
    return new Promise(function(resolve, reject) {
      $.get('/maps/search', {search: filters}, (response) => {
        resolve(response);
      });
    });
  }


  static post(state) {
    //var attachment = "http://cdn.londonandpartners.com/asset/d3a9f869f9f4bbd8fb1a3e6bf1124318.jpg";
    //if(this.state.attachment.length) {
    //  attachment = this.state.attachment;
    //}
    //
    //console.log("POSTING PIN", this.state);
    //
    //const pin = {
    //  title: this.state.title,
    //  location: this.state.location,
    //  date_from: (new Date()).toString(),
    //  lat: this.state.pin_form_lat_lng.lat,
    //  lng: this.state.pin_form_lat_lng.lng,
    //  user_id: 1,
    //
    //  content_entry: {
    //    title: this.state.description,
    //    resource: {type: "image", url: attachment}
    //  }
    //};
    //
    //SearchResultsActions.postPin(pin);
    //
    //// clear the attachment field - FIXME figure out how to do this as a controled component
    //$(event.target).find('.form-group-upload input[type=file]').get(0).value = '';
    //
    //const current_state = MapPinStore.getState();
    //const visible = current_state.pin_form_visible;
    //

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
        // TODO fix up.
        user_id: 1,
        link_url: state.link_url,

        pin_content_entry_attributes: {
          content_entry_attributes: {
            content: state.content,
            video_url: state.video_url,
            attribution: state.attribution,
            content_type_attributes: {
              name: state.pin_type
            }
          }
        }
      }
    };





    console.log("SearchResultSource pin_data", pinData);

    return new Promise(function(resolve, reject) {
      $.post('/maps', pinData, (response) => {
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