(() => {
  class FilterStateActions {
    toggleAdvancedFilters(visible) {
      return visible;
    }

    updateFilterAttribute(attribute, value) {
      return {attribute: attribute, value: value};
    }
  }

  this.FilterStateActions = alt.createActions(FilterStateActions);
})();
