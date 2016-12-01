class GeoreferencedOverlay {

  constructor(tableId) {
    this.tableId = tableId;
  }

  getImageIds() {
    var tableId = this.tableId;
    return new Promise(function(resolve, reject) {
      let query = `select georeferencer_id from ${tableId} where status = 'georeferenced'`;
      let data = {
        sql: query,
        key: LoL.secrets.google_maps_api_secret
      };
      let url = `https://www.googleapis.com/fusiontables/v2/query`;
      $.get(url, data).done((response) => {
        resolve(response.rows.map((idArray) => { return idArray[0] }));
      }).fail((response) => {
        reject(response);
      })
    })
  }
}