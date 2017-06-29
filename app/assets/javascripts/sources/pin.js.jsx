class Pin {
  static find(id) {
    return new Promise((resolve, reject) => {
      $.get("/maps/" + id).done((response) => {
        resolve(response)
      }).fail((response) => {
        console.log("FAIL", response);
        reject(response);
      });
    });
  }

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
    var fromDate = moment(`${state.date_from_year}-${state.date_from_month == "" ? 1 : state.date_from_month}-${state.date_from_day == "" ? 1 : state.date_from_day}`, ["YYYY-MM-DD", "YYYY-M-D"]).format();
    var toDate = null;
    if (state.date_to_year !== "" || state.date_to_month !== "" || state.date_to_day !== "") {
      toDate = moment(`${state.date_to_year}-${state.date_to_month == "" ? 1 : state.date_to_month}-${state.date_to_day == "" ? 1 : state.date_to_day}`, ["YYYY-MM-DD", "YYYY-M-D"]).format();
    }
    //here's what Rails expects:
    // title: "foo", lat: 0, lng: 0, date_from: DateTime.now, user: User.first, pin_content_entry_attributes: {content_entry_attributes: {content_type: ContentType.first, tileserver_url: "foo"}}

    // here are the fields on a ContentEntry in the backend:
    // ["id", "content_type_id", "attached_file_id", "attached_file_filename", "attached_file_size", "attached_file_content_type", "url", "content", "attribution", "data", "created_at", "updated_at", "tileserver_url"]

    let pinData = {
      pin: {
        title: state.title,
        description: state.description,
        location: state.location_object.location.long_name,
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
            attached_file: state.attached_file,
            file_name: state.file_name
          }
        }
      }
    };

    if(state.pin_content_entry_id && state.content_entry_id) {
      pinData.pin.pin_content_entry_attributes.id = state.pin_content_entry_id;
      pinData.pin.pin_content_entry_attributes.content_entry_attributes.id = state.content_entry_id;
    }

    if(state.collection_id) {
      pinData.pin.collection_pins_attributes = [{collection_id: state.collection_id}];
    }

    // dont pass the attached_file attribute if the user is just editing the content entry attributes(but not replacing the file)
    if(state.editing && pinData.pin.pin_content_entry_attributes.content_entry_attributes['attached_file'] == "") {
      delete pinData.pin.pin_content_entry_attributes.content_entry_attributes['attached_file'];
    }

    let route  = "/maps";
    let method = "POST";

    if(state.editing) {
      route  = `/maps/${state.id}`;
      method = "PATCH";
    }

    return new Promise(function(resolve, reject) {
      $.ajax({
        url: route,
        data: JSON.stringify(pinData),
        type: method,
        dataType: "json",
        contentType: "application/json"
      }).done((response) => {
        resolve(response);
      }).fail((response) => {
        reject(response);
      });
    });
  }

  static addToCollection(state) {
    let pinData = {
      id: state.pin_id,
      pin: {
        collection_pins_attributes: [{collection_id: state.collection_id}]
      }
    };

    return new Promise((resolve, reject) => {
      $.ajax({
        url: `/pins/${state.pin_id}`,
        data: JSON.stringify(pinData),
        type: "PATCH",
        dataType: "json",
        contentType: "application/json"
      }).done((response) => {
        resolve(response);
      }).fail((response) => {
        reject(response);
      });
    });
  }

  static flag(id) {
    return new Promise(function(resolve,reject) {
      let url = "/pins/"+id+"/flag";
      $.post(url).done((response) => {
        resolve(response);
      }).fail((response) => {
        reject(response);
      })
    })
  }
}
