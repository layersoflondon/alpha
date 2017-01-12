(() => {
  // Trigger a modal dialog to allow a user to flag issues with some content or an overlay
  class MapModerationStore {
    constructor() {
      this.moderating = null;
      this.type = null;

      this.bindListeners({
        onFlagContentEntry: MapModerationActions.FLAG_CONTENT_ENTRY,
        onFlagGeoreferencedOverlay: MapModerationActions.FLAG_GEOREFERENCED_OVERLAY,
        onDismissModerationForm: MapModerationActions.DISMISS_MODERATION_FORM
      });
    }

    onFlagContentEntry(content_entry) {
      this.moderating = content_entry;
      this.type = 'content_entry';
    }

    onFlagGeoreferencedOverlay(overlay) {
      console.log('onFlagGeoreferencedOverlay');

      this.moderating = overlay;
      this.type = 'georeferenced_overlay';
    }

    onDismissModerationForm() {
      this.moderating = null;
      this.type = null;
    }
  }

  this.MapModerationStore = alt.createStore(MapModerationStore, 'MapModerationStore');
})();
