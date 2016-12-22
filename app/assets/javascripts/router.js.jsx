$(() => {
  router = new Navigo(root = null, useHash=false);
  router.on(
    {
      'add': (() => { MapPinActions.enablePinForm(true)}),
      'pins/:id': (
        (params) => {

          let pins = _.chain(MapContainerStore.getState().markers).map(
            (marker) => {
              return marker.pins;
            }
          ).flatten().value();
          let pin = _.find(pins, (p) => {return p.id == params.id});
          if (typeof(pin) !== 'undefined') {
            overlay = new ContentOverlay(pin);
            overlay.render();
          }
        }
      )
    }
  ).resolve();
});