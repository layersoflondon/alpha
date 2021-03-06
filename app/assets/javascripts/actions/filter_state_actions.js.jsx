(() => {
  class FilterStateActions {
    toggleAdvancedFilters(visible) {
      return visible;
    }

    updateSearchQuery(value) {
      return value;
    }

    updateSearchDateRange(range) {
      return range;
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

    updateDefaultYearFrom(year) {
      return year;
    }
  }

  this.FilterStateActions = alt.createActions(FilterStateActions);
})();
