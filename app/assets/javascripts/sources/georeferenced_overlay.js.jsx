class GeoreferencedOverlay {

  constructor(tableId) {
    this.tableId = tableId;
  }

  getImageData() {
    return new Promise(function(resolve, reject) {
      let url = "/georeferenced_images";
      $.get(url).done((response) => {
        console.log(response);
        resolve(response);
      }).fail((response) => {
        reject(response);
      })
    })
  }

  static flagImage(id) {
    return new Promise(function(resolve,reject) {
      let url = "/overlays/"+id+"/flag";
      $.post(url).done((response) => {
        resolve(response);
      }).fail((response) => {
        reject(response);
      })
    })
  }
}