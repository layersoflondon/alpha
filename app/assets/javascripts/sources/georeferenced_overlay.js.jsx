class GeoreferencedOverlay {

  constructor(tableId) {
    this.tableId = tableId;
  }

  getImageData() {
    var tableId = this.tableId;
    return new Promise(function(resolve, reject) {
      let query = `select georeferencer_id, center, south_west, north_east from ${tableId} where status = 'georeferenced'`;
      let data = {
        sql: query,
        key: LoL.secrets.google_maps_api_secret
      };
      let url = `https://www.googleapis.com/fusiontables/v2/query`;
      $.get(url, data).done((response) => {
        //the response looks like this:
        //{
        //  columns: [
        //  "foo",
        //  "bar",
        //  "baz"
        //  ],
        //  rows: [
        //    [
        //      "foo1",
        //      "bar1",
        //      "baz1"
        //    ],
        //    [
        //      "foo2",
        //      "bar2",
        //      "baz2"
        //    ]
        //  ]
        //
        //}
        let cols = response.columns;
        resolve(response.rows.map((row) => { return _.zipObject(cols, row) }));
      }).fail((response) => {
        reject(response);
      })
    })
  }

  static flagImage(id) {
    return new Promise(function(resolve,reject) {
      let url = "/maps/flag_overlay";
      let data = {
        id: id
      };
      $.post(url, data).done((response) => {
        resolve(response);
      }).fail((response) => {
        resolve(response);
      })
    })
  }
}