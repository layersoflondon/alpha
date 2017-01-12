(() => {
  class MapModerationActions {
    flagContentEntry(content_entry) {
      return content_entry;
    }

    flagGeoreferencedOverlay(overlay) {
      return overlay;
    }

    dismissModerationForm() {
      return true;
    }
  }

  this.MapModerationActions = alt.createActions(MapModerationActions);
})();
