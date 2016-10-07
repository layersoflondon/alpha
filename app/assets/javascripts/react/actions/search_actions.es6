var alt = require('../alt.es6');

class SearchActions {
  updateSearchResults(results) {
    return results;
  }
}

module.exports = alt.createActions(SearchActions);
