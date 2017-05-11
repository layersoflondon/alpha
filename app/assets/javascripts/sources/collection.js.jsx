class Collection {
  static searchCollections(search_params) {
    return new Promise((resolve, reject) => {
      $.get("/collections/search", search_params).done((response) => {
        resolve(response)
      }).fail((response) => {
        console.log("Failed to get collections", response);
        reject(response);
      });
    });
  }

  static find(id) {
    return new Promise((resolve, reject) => {
      $.get(`/collections/${id}`).done((response) => {
        resolve(response);
      }).fail((response) => {
        reject(response);
      });
    });
  }
}
