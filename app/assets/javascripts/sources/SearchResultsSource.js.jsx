var SearchResultsSource = {
  fetch: function() {
    return new Promise(function(resolve, reject) {
      $.get('/pins/search', {search: FilterStateStore.getState()}, function(response) {
        resolve(response);
      }.bind(this));
    });
  },

  postPin: function(pin_data) {
    console.log("SearchResultSource pin_data", pin_data);

    return new Promise(function(resolve, reject) {
      $.post('/pins', pin_data, function(response){
        resolve(response);
      }.bind(this));
    });
  }
}
