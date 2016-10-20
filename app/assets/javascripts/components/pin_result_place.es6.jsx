class PinResultPlace extends React.Component {
  constructor(props) {
    super(props);

    this.gallery = $("#map-page-gallery");
    this.gallery.lightGallery();
  }

  showResource() {
    var resource = this.props.place.resource;
    var resource_object = {
      dynamic: true,
      dynamicEl: [{
        src: resource.url,
        thumb:  resource.url,
        subHtml: this.props.place.title + " " + resource.type
      }]
    };

    $(document).lightGallery(resource_object);
  }

  render () {
    return (
      <li>
        <a onClick={this.showResource.bind(this)}>
          <div className="icon"><img src={LoL.urls[this.props.place.resource.type]} alt="{this.props.place.resource.type} resource icon" /></div>
          <h3>{this.props.place.title}</h3>
          <p>Pinned on 20th Oct 2016</p>
        </a>
      </li>
    );
  }
}
