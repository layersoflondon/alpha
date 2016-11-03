var SearchResultsSource = {
  fetch: function() {
    return new Promise(function(resolve, reject) {
      $.get('/maps/search', {search: FilterStateStore.getState()}, function(response) {
        resolve(response);
      }.bind(this));
    });
  },

  postPin: function(pin_data) {
    console.log("SearchResultSource pin_data", pin_data);

    return new Promise(function(resolve, reject) {
      $.post('/maps', {pin: pin_data}, function(response){
        resolve(response);
      }.bind(this));
    });
  }
}
