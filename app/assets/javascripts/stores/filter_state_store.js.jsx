(() => {
  /*
  Params we POST to the pins controller when searching and filtering
  */
  class FilterStateStore {
    constructor() {
      this.advanced_filters_visible = false;
      this.suppress_update_results_event = false; // WIP - when we change a state attribute here, we will display an 'UPDATE RESULTS' button to change the markers on the map
      this.search_query  = '';
      this.centre_point  = {lat: 51.5353284, lng: 0.1389512};
      this.search_bounds = {southWest: {lat: 51.50211782162702, lng: -0.03398895263671874}, northEast: {lat: 51.50211782162702, lng: -0.03398895263671874}};
      this.search_radius = 10000; //set initial radius to 10km
      this.date_from     = null;
      this.date_to       = null;

      this.bindListeners({
        onUpdateSearchQuery:           FilterStateActions.UPDATE_SEARCH_QUERY,
        onUpdateSearchDateRange:       FilterStateActions.UPDATE_SEARCH_DATE_RANGE,
        onToggleAdvancedFilters:       FilterStateActions.TOGGLE_ADVANCED_FILTERS,
        onUpdateFilterAttribute:       FilterStateActions.UPDATE_FILTER_ATTRIBUTE,
        onUpdateFilterCentreAndBounds: FilterStateActions.UPDATE_FILTER_CENTRE_AND_BOUNDS,
        onUpdateFilterBounds:          FilterStateActions.UPDATE_FILTER_BOUNDS
      });
    }

    onToggleAdvancedFilters(visible) {
      this.advanced_filters_visible = visible;
      this.suppress_update_results_event = true;
    }

    onUpdateSearchQuery(query) {
      this.search_query = query;

      this.suppress_update_results_event = false;
    }

    onUpdateSearchDateRange(range) {
      this.date_from = range[0];
      this.date_to   = range[1];
    }

    onUpdateFilterAttribute() {
      this.suppress_update_results_event = false;
    }

    onUpdateFilterCentreAndBounds(new_bounds) {
      this.centre_point  = new_bounds.centre;
      this.search_bounds = new_bounds.bounds;

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
