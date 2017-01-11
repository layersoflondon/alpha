$(() => {
  router = new Navigo(root = null, useHash=false);
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
      )
    }
  ).resolve();
});