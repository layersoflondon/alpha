class ContentEntry extends React.Component {
  constructor(props) {
    super(props);
  }

  showResource() {
    var resource = this.props.content_entry.content_entry.resource;

    // each image we render in the page is a member of its own gallery. to get this working, we inject a div and attach the gallery to it.
    // when the gallery gets its onCloseAfter.lg event, we remove the injected div from the page.
    var $div = $('<div id="'+this.props.content_entry.content_entry.id+'" style="position: absolute; top: 0; left: 0; padding: 1000px; display: none;"></div>');
    $("body").append($div);

    var resource_object = {
      dynamic: true,
      dynamicEl: [{
        src: resource.file_path,
        thumb:  resource.file_path,
        subHtml: this.props.content_entry.content_entry.title + " " + resource.type
      }]
    };

    this.gallery = $div.lightGallery(resource_object);
    this.gallery.on("onCloseAfter.lg", (event)=>{
      $div.remove();
    });
  }

  render () {
    const icon = LoL.urls[this.props.content_entry.content_entry.resource.type];

    const link = (
      <a onClick={this.showResource.bind(this)}>
        <div className="icon">
          <img src={LoL.urls[this.props.content_entry.content_entry.resource.type]} alt="{this.props.content_entry.content_entry.resource.type} resource icon" />
        </div>

        <h3>{this.props.content_entry.content_entry.title}</h3>
        <p>Pinned on {this.props.content_entry.pinned_on_date}</p>
      </a>
    );

    return <li>{link}</li>;
  }
}
