(() => {
  /*
  Sidebar & map content store
  */
  class MapContainerStore {
    constructor() {
      this.lat  = 51.50201096474784;
      this.lng  = -0.12342453002929686;
      this.zoom = 13;
      this.searching = false;
      this.places = [];
      this.overlays = [];
      this.show_overlays = true;
      this.show_collections = false;
      this.visible_overlays = [];
      this.overlay_options  = [];

      this.all_collections  = [];
      this.user_collections = [];
      this.team_collections = [];
      this.public_collections = [];

      this.markers = [];
      this.pins = [];
      this.notes = [];

      this.bindListeners({
        onFetchSearchResults: MapContainerActions.FETCH_SEARCH_RESULTS,
        onFetchNearbyResults: MapContainerActions.FETCH_NEARBY_RESULTS,

        onUpdateCoordinates: MapContainerActions.UPDATE_COORDINATES,
        onUpdateMarkers: MapContainerActions.UPDATE_MARKERS,
        onUpdatePins: MapContainerActions.UPDATE_PINS,
        onUpdatePlaces: MapContainerActions.UPDATE_PLACES,
        onUpdateOverlays: MapContainerActions.UPDATE_OVERLAYS,
        onUpdateNotes: MapContainerActions.UPDATE_NOTES,
        onUpdateCollections: MapContainerActions.UPDATE_COLLECTIONS,
        onUpdateCollection: MapContainerActions.UPDATE_COLLECTION,
        onToggleShowOverlays: MapContainerActions.TOGGLE_SHOW_OVERLAYS,
        onToggleOverlayVisibility: MapContainerActions.TOGGLE_OVERLAY_VISIBILITY,
        onToggleShowCollections: MapContainerActions.TOGGLE_SHOW_COLLECTIONS,
        onSetOverlayOpacity: MapContainerActions.SET_OVERLAY_OPACITY,
        onAddPin: MapContainerActions.ADD_PIN,
        onAddMarker: MapContainerActions.ADD_MARKER,
        onUpdateMarker: MapContainerActions.UPDATE_MARKER
      });
    }

    onFetchSearchResults() {
      this.searching = true;

      this.places = [];
      this.notes  = [];
    }

    onFetchNearbyResults() {
      this.searching = true;
      this.pins = [];
    }

    onUpdateCoordinates(latlng) {
      if(latlng) {
        this.lat = latlng.lat;
        this.lng = latlng.lng;
      }else {
        return false;
      }
    }

    onUpdateMarkers(marker_options) {
      this.searching = false;
      this.markers = marker_options.markers;

      if(marker_options.update_coords && marker_options.markers.length) {
        this.lat = marker_options.markers[0].position.lat;
        this.lng = marker_options.markers[0].position.lng;
      }
    }

    onUpdatePins(pins) {
      this.searching = false;
      this.pins = pins;
    }

    onUpdatePlaces(places) {
      this.searching = false;
      this.places    = places;
    }

    onToggleShowOverlays() {
      this.show_overlays    = !this.show_overlays;
      this.show_collections = false;
    }

    onUpdateOverlays(overlays) {
      this.overlays = overlays;
    }

    onToggleShowCollections() {
      this.show_collections = !this.show_collections;
      this.show_overlays    = false;
    }

    onUpdateCollections(collections) {
      this.all_collections = collections;

      collections.map((collection) => {
        if(collection.public === true) {
          this.public_collections.push(collection);
        }else if(collection.public === false && !collection.team_collection) {
          this.user_collections.push(collection);
        }else if(collection.team_collection === true) {
          this.team_collections.push(collection);
        }
      });
    }

    onUpdateCollection(collection) {
      let all_collections = this.all_collections.slice();
      let user_collections = this.user_collections.slice();
      let public_collections = this.public_collections.slice();
      let team_collections = this.team_collections.slice();

      all_collections.unshift(collection);
      all_collections = _.uniqBy(all_collections, (i) => {return i.id});
      this.all_collections = all_collections;

      if(collection.public === true) {
        user_collections.push(collection);
        this.user_collections = user_collections;

      }else if(collection.public === false) {
        public_collections.push(collection);
        this.public_collections = public_collections;

      }else if(collection.team_collection === true) {
        team_collections.push(collection);
        this.team_collections = team_collections;
      }
    }

    onUpdateNotes(notes) {
      this.searching = false;
      this.notes = notes;
    }

    onToggleOverlayVisibility(overlay_id) {
      let overlay_ids = this.visible_overlays.slice();
      let current_index = overlay_ids.indexOf(overlay_id);

      if( current_index > -1 ) {
        overlay_ids.splice(current_index, 1);
      }else {
        overlay_ids.push(overlay_id);
        let overlay = _.find(this.overlays, (overlay) => {return overlay.id == overlay_id});

        /*
         focus the overlay after a short timeout to allow the MapContainerAction's
         dispatcher enough time to complete before firing the MapStateAction's event
         */
        setTimeout(() => {
          let overlay_object = overlay;

          // for some overlay types, we need to figure out the proper centre point
          switch(overlay.resource.type) {
            case "polygon": // position the map center at the starting point of a polygon
              overlay_object = {position: {lat: overlay.resource.polygon[0][0], lng: overlay.resource.polygon[0][1]}};
              break;
            case "georeferencer_tileserver":
              overlay_object = {position: FilterStateStore.getState().centre_point}; // keep the map in its current position; we'll re-position it when we render the georeferenced tile group...
              break;
            case "tileserver":
              // if we're rendering a tileserver layer that isn't one of our own (ie, a google maps layer), then we should remove the position attribute from the
              // object to avoid re-setting the maps center point (passing an object into focusPlace with a .position: {lat/lng} object will cause a pan/zoom in leaflet)
              if(overlay_object.resource.tileserver_url.match(/layersoflondon/) == null) {
                delete overlay_object['position'];
              }
              break;

          }

          MapStateActions.focusPlace(overlay_object);
        }, 50);
      }

      this.visible_overlays = overlay_ids;
    }

    onSetOverlayOpacity(overlay_object) {
      let overlay_ids = this.visible_overlays.slice();
      let overlay_opts = this.overlay_options.slice();
      let current_index = overlay_ids.indexOf(overlay_object.overlay_id);
      let overlay_object_options = _.find(this.overlay_options, (o) => {return o.id == overlay_object.overlay_id});

      if(current_index > -1 && overlay_object_options) {
        let option_index = _.findIndex(overlay_opts, (o) => {return o.id == overlay_object.overlay_id});
        overlay_opts.splice(option_index, 1);
        overlay_opts.push({id: overlay_object.overlay_id, opacity: overlay_object.opacity});
      }else if(current_index > -1 && !overlay_object_options) {
        overlay_opts.push({id: overlay_object.overlay_id, opacity: overlay_object.opacity});
      }

      this.overlay_options = overlay_opts;
    }

    onAddPin(pin_data) {
      let pins = this.pins.slice();

      pins.push(marker_data);
      this.pins = pins;
    }

    onAddMarker(marker_data) {
      let markers = this.markers.slice();

      let current_marker = _.find(markers, function(m) {
        return m.position.lat == marker_data.position.lat && m.position.lng == marker_data.position.lng;
      });

      // if the map has a marker at this location already, we add it to that
      // marker's array of pins, otherwise, we add a new marker at the given position...

      if( typeof current_marker !== "undefined" ) {
        current_marker.pins.push(marker_data);
        this.markers = markers;
      }else {
        const marker = {
          position: marker_data.position,
          pins: [marker_data]
        };
        markers.push(marker);
        this.markers = markers;
      }

      return true;
    }

    onUpdateMarker(marker_data) {
      let markers = this.markers.slice();

      let current_marker = _.findIndex(markers, (marker) => {
        return _.find(marker.pins, (pin) => {
          return pin.id == marker_data.id;
        });
      });

      if(current_marker > -1) {
        let marker = markers[current_marker];
        let pin_index = _.findIndex(marker.pins, (pin) => {return pin.id == marker_data.id});
        let pins = marker.pins.slice();

        if(JSON.stringify(marker_data.position) !== JSON.stringify(marker.position)) {
          // the note has been moved to a new location.
          pins.splice(pin_index, 1); // remove this note from its previous markers' content entry list

          // if this marker has no remaining content entries, remove the marker completely
          if(pins.length==0){
            markers.splice(current_marker, 1);
          }

          // add our new marker
          const marker = {
            position: marker_data.position,
            pins: [marker_data]
          };
          markers.push(marker);
        }else {
          // the note has been updated in-place

          pins[pin_index] = marker_data;
          markers[current_marker] = marker;
        }

        marker.pins = pins;

        this.markers = markers;
      }else {
        const marker = {
          position: marker_data.position,
          pins: [marker_data]
        };
        markers.push(marker);
        this.markers = markers;
      }

      return true;
    }
  }

  this.MapContainerStore = alt.createStore(MapContainerStore, 'MapContainerStore');
})();
