class PinResultPlace extends React.Component {
  constructor(props) {
    super(props);

    this.gallery = $("#map-page-gallery");
    this.gallery.lightGallery();
  }

  showResource() {
    var resource = this.props.place.resource;
    // var resource_markup = "<a href='http://cdn.londonandpartners.com/asset/d3a9f869f9f4bbd8fb1a3e6bf1124318.jpg'><img src='http://cdn.londonandpartners.com/asset/d3a9f869f9f4bbd8fb1a3e6bf1124318.jpg' /></a>";
    //
    // this.gallery.append(resource_markup);
    // this.gallery.data('lightGallery').destroy(true);
    // this.gallery.lightGallery();
    var resource_object = {
      dynamic: true,
      dynamicEl: [{
        src: resource.url,
        thumb:  resource.url,
        subHtml: resource.type
      }]
    };

    console.log(resource_object);

    $(document).lightGallery(resource_object);
  }

  render () {
    return (
      <li>
        <a onClick={this.showResource.bind(this)}>
          <div className="icon"><img src={LoL.urls[this.props.place.resource.type]} alt="{this.props.place.resource.type} resource icon" /></div>
          <h3>{this.props.place.name}</h3>
          <p>Pinned on 20th Oct 2016</p>
        </a>
      </li>
    );
  }
}
