(() => {
  class FilterStateStore {
    constructor() {
      this.advanced_filters_visible = false;
      this.suppress_update_results_event = false;
      this.centre_point = {};
      this.search_bounds = {};

      this.bindListeners({
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

    onUpdateFilterAttribute() {
      console.log("onUpdateFilterAttribute called", arguments);

      this.suppress_update_results_event = false;
    }

    onUpdateFilterCentre(centre_point) {
      this.centre_point = centre_point;
      this.suppress_update_results_event = false;
    }

    onUpdateFilterBounds(bounds) {
      this.search_bounds = bounds;
      this.suppress_update_results_event = false;
    }
  }

  this.FilterStateStore = alt.createStore(FilterStateStore, 'FilterStateStore');
})();
