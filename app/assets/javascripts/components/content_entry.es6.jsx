class ContentEntry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {show_text: false, text: "", text_content: ""}
  }

  showResource() {
    const resource = this.props.content_entry.content_entry.resource;

    // if this is a text resource and our current show_text state attribute is
    // true, we should just toggle it back to false and return (other content
    // entry types are displayed in a gallery)

    if(resource.type==="text" && this.state.show_text) {
      this.setState({show_text: false});
    }else if (resource.type==="text"){
      this.setState({show_text: true, text: resource.text, text_content: resource.text_content})
    }else {
      this.mediaObject(resource);
    }
  }

  mediaObject(resource) {
    const resource_attribute = resource.type + "_path";

    var gallery_objects = [];
    var gallery_options = {
      container: '#blueimp-gallery', carousel: true, closeOnSlideClick: true, closeOnEscape: true, startSlideshow: true
    };

    // we're embedding a media item from youtube
    if(resource.embedded_resource) {
      const source   = resource["href"];
      const yt_attrs = this.getVideoId(source);

      var video_object = {
        title:  resource.title,
        href:   source,
        type:   "text/html"
      };

      Object.assign(video_object, yt_attrs);

      gallery_objects.push(video_object);

      // change the default gallery options
      gallery_options['youTubeClickToPlay'] = false;
    }else {
      gallery_objects.push({
        title: resource.title,
        href: resource[resource_attribute],
        type: resource.mime_type,
        poster: resource.poster
      });
    }

    blueimp.Gallery(gallery_objects, gallery_options);
  }

  getVideoId(source) {
    const id = source.match(/\?v=([^$]+)/i)[1];
    const poster = `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;

    return {youtube: id, poster: poster};
  }

  render () {
    var text = "";
    if(this.state.show_text) {
      text = (
        <div>
          <br/>
          <p>{this.state.text}</p>
          <p>{this.state.text_content}</p>
          <hr/>
        </div>
      );
    }

    var pinned = "";
    if(this.props.content_entry.pinned_on_date) {
      pinned = <p>Pinned on {this.props.content_entry.pinned_on_date}</p>;
    }

    if(typeof this.props.content_entry.content_entry.resource === "undefined" ) { // a marker with associated resource
      var link = (
        <div>
          <h3>{this.props.content_entry.content_entry.title}</h3>
          {text}
          {pinned}
        </div>
      );
    }else {
      const icon = LoL.urls[this.props.content_entry.content_entry.resource.type];

      var link = (
        <a href="#" onClick={this.showResource.bind(this)}>
          <div className="icon">
            <img src={LoL.urls[this.props.content_entry.content_entry.resource.type]} alt="{this.props.content_entry.content_entry.resource.type} resource icon" />
          </div>

          <h3>{this.props.content_entry.content_entry.title}</h3>
          {text}
          {pinned}
        </a>
      );
    }

    return <li>{link}</li>;
  }
}
