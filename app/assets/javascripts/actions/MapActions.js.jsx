(() => {
  class MapActions {
    fetchSearchResults() {
      return (dispatch) => {
        dispatch();

        var self = this;

        setTimeout(function(){
          self.updatePins([{id: 1, name: "This is a newly added pin", position: [51.525, -0.09], places: [{id: 1, name: "Marker 1"}]}]);
        }, 200);
      }
    }

    updatePins(pins) {
      return pins;
    }
  }

  this.MapActions = alt.createActions(MapActions);
})();
