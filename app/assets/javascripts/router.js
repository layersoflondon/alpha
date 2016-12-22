$(function() {
  router = new Navigo(root = null, useHash=false);
  router.on(
    {
      'add': (function() { MapPinActions.enablePinForm(true)}),
      'pin/:id': (function(params) {console.log("this is where we'll show pin", params.id)})
    }
  ).resolve();
});