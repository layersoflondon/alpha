class ContentEntry extends React.Component {
  constructor(props) {
    super(props);
  }

  showResource() {
    const resource = this.props.content_entry.content_entry.resource;
    const resource_attribute = this.props.content_entry.content_entry.resource.type + "_path";

    // each image we render in the page is a member of its own gallery. to get this working, we inject a div
    // and attach the gallery to it. when the gallery gets its close event, we remove the injected div from the page
    blueimp.Gallery([
      {
        title: resource.title,
        type: resource.type,
        href: resource[resource_attribute], type: resource.mime_type,
        poster: resource.poster
      }],
      {container: '#blueimp-gallery', carousel: true, closeOnEscape: true, startSlideshow: true}
    );
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
