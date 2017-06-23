$(() => {
  router = new Navigo(null, true);
  router.on(
    {
      'add': (() => { MapPinActions.enablePinForm(true)}),
      'pins/:id': (
        (params) => {
          Pin.find(params.id).then((pin) => {
              overlay = new ContentOverlay(pin);
              overlay.render();
          });
        }
      ),
      'marker-pin/:id': (
        (params) => {
        }
      ),
      'collections/:id': (
        (params) => {
          // close any open content entries
          if(typeof gallery == "object") {
            gallery.close();
          }

          // close any opened map markers
          _.map($(".leaflet-popup-close-button"), (p)=> {p.click()});

          Collection.find(params.id).then((collection) => {
            MapContainerActions.updateMarkers(collection.markers);
            MapPinActions.setNotification({message: `Showing <strong>${collection.name}</strong> collection by`, detail: collection.collection_by});
          });
        }
      )
    }
  ).resolve();
});