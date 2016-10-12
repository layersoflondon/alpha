var mockData = [
  {id: 1, position: {lat: 1, lng: 1}, results: [{id: 1, name: "Some result name"}, {id: 2, name: "Another result at the same point"}]},
  {id: 2, position: {lat: 1.4, lng: 1.4}, results: [{id: 1, name: "A single result"}]}
];

var SearchResultsSource = {
  fetch: function() {
    return new Promise(function(resolve, reject) {
      setTimeout(function(){
        resolve(mockData);
      }, 1000);
    });
  }
}
