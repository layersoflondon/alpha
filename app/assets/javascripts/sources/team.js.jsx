class Team {
  static searchTeams(search_params) {
    return new Promise((resolve, reject) => {
      $.getJSON("/user_groups", search_params, "json").done((response) => {
        resolve(response)
      }).fail((response) => {
        console.log("Failed to get collections", response);
        reject(response);
      });
    });
  }
}
