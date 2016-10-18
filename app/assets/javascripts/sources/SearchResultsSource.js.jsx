var SearchResultsSource = {
  fetch: function() {
    return new Promise(function(resolve, reject) {
      $.get('/fetch', {search: FilterStateStore.getState()}, function(response) {
        resolve(response);
      }.bind(this));
    });
  }
}
