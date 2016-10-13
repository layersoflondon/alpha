(() => {
  class MapStore {
    constructor() {
      this.lat  = 51.505;
      this.lng  = -0.09;
      this.zoom = 13;
      this.places = [
        {id: 1, name: "Marker 1"},
        {id: 2, name: "Marker 2"},
        {id: 3, name: "Marker 3"}
      ];
      this.overlays = [
        {id: 1, name: "An overlay"}
      ],
      this.collections = [
        {id: 1, name: "A collection"}
      ];
      this.pins = [
        {id: 1, name: "Pin 1", position: [51.505, -0.09], places: [{id: 1, name: "Marker 1"}]},
        {id: 2, name: "Pin 2", position: [51.515, -0.11], places: [{id: 1, name: "Marker 1"}, {id: 2, name: "Marker 2"}]},
        {id: 3, name: "Pin 3", position: [51.525, -0.13], places: [{id: 1, name: "Marker 1"}, {id: 2, name: "Marker 2"}, , {id: 3, name: "Marker 3"}]}
      ];

      this.bindListeners({
        onUpdatePins: MapActions.UPDATE_PINS
      });
    }

    onUpdatePins(pins) {
      this.pins = pins;
    }
  }

  this.MapStore = alt.createStore(MapStore, 'MapStore');
})();
