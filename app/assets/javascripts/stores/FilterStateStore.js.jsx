(() => {
  class FilterStateStore {
    constructor() {
      this.advanced_filters_visible = false;

      this.bindListeners({
        onToggleAdvancedFilters: FilterStateActions.TOGGLE_ADVANCED_FILTERS,
        onUpdateFilterAttribute: FilterStateActions.UPDATE_FILTER_ATTRIBUTE
      })
    }

    onToggleAdvancedFilters(visible) {
      this.advanced_filters_visible = visible;
    }

    onUpdateFilterAttribute() {
      console.log("onUpdateFilterAttribute called", arguments);
    }
  }

  this.FilterStateStore = alt.createStore(FilterStateStore, 'FilterStateStore');
})();
