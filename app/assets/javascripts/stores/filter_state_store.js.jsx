(() => {
  /*
  Params we POST to the pins controller when searching and filtering
  */
  class FilterStateStore {
    constructor() {
      this.advanced_filters_visible = false;
      this.suppress_update_results_event = false;
      this.search_query = '';
      this.centre_point = {};
      this.search_bounds = {southWest: {lat: 51.50211782162702, lng: -0.03398895263671874}, northEast: {lat: 51.50211782162702, lng: -0.03398895263671874}};
      this.search_radius = 10000; //set initial radius to 10km

      this.bindListeners({
        onUpdateSearchQuery:     FilterStateActions.UPDATE_SEARCH_QUERY,
        onToggleAdvancedFilters: FilterStateActions.TOGGLE_ADVANCED_FILTERS,
        onUpdateFilterAttribute: FilterStateActions.UPDATE_FILTER_ATTRIBUTE,
        onUpdateFilterCentre:    FilterStateActions.UPDATE_FILTER_CENTRE,
        onUpdateFilterBounds:    FilterStateActions.UPDATE_FILTER_BOUNDS
      })
    }

    onToggleAdvancedFilters(visible) {
      this.advanced_filters_visible = visible;
      this.suppress_update_results_event = true;
    }

    onUpdateSearchQuery(query) {
      this.search_query = query;

      this.suppress_update_results_event = false;
    }

    onUpdateFilterAttribute() {
      this.suppress_update_results_event = false;
    }

    onUpdateFilterCentre(centre_point) {
      this.centre_point = centre_point;

      this.suppress_update_results_event = false;
    }

    onUpdateFilterBounds(search_bounds) {
      this.search_bounds = search_bounds.bounds;
      this.search_radius = search_bounds.radius;

      this.suppress_update_results_event = false;
    }
  }

  this.FilterStateStore = alt.createStore(FilterStateStore, 'FilterStateStore');
})();
