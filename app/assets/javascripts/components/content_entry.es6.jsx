class ContentEntry extends React.Component {
  constructor(props) {
    super(props);

    this.gallery = $("#map-page-gallery");
    this.gallery.lightGallery();
  }

  showResource() {
    var resource = this.props.content_entry.resource;
    var resource_object = {
      dynamic: true,
      dynamicEl: [{
        src: resource.url,
        thumb:  resource.url,
        subHtml: this.props.content_entry.title + " " + resource.type
      }]
    };

    $(document).lightGallery(resource_object);
  }

  render () {
    if(this.props.content_entry.resource) {
      var link = (
        <a onClick={this.showResource.bind(this)}>
          <div className="icon">
            <img src={LoL.urls[this.props.content_entry.resource.type]} alt="{this.props.content_entry.resource.type} resource icon" />
          </div>
          <h3>{this.props.content_entry.title}</h3>
          <p>Pinned on 20th Oct 2016</p>
        </a>
      );
    }else {
      var link = (
        <a>
          <div className="icon">
            <img src={LoL.urls.other} alt="Resource icon" />
          </div>
          <h3>{this.props.content_entry.title}</h3>
          <p>Pinned on 20th Oct 2016</p>
        </a>
      );
    }

    return link;
  }
}
