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

  static post(state) {
    let params = {
      collection: {
        name: state.name,
        description: state.description
      }
    };

    if(state.collection_type == "team") {
      params.collection.user_group_collection_attributes = {user_group_id: state.team_id};
    }else if(state.collection_type == "public") {
      params.collection.user_collection_attributes = {privacy: "open"}
    }else if(state.collection_type == "personal") {
      params.collection.user_collection_attributes = {privacy: "restricted"}
    }

    return new Promise((resolve, reject) => {
      $.post('/collections', params).done((response) => {
        resolve(response);
      }).fail((response) => {
        reject(response);
      });
    });
  }
}
