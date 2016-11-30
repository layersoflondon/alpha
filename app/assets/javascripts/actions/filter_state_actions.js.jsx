(() => {
  class FilterStateActions {
    toggleAdvancedFilters(visible) {
      return visible;
    }

    updateSearchQuery(value) {
      return value;
    }

    updateFilterAttribute(attribute, value) {
      return {attribute: attribute, value: value};
    }

    updateFilterCentreAndBounds(bounds) {
      return bounds;
    }

    updateFilterBounds(bounds) {
      return bounds;
    }
  }

  this.FilterStateActions = alt.createActions(FilterStateActions);
})();
