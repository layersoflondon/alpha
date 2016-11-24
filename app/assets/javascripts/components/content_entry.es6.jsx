class ContentEntry extends React.Component {
  constructor(props) {
    super(props);
  }

  showResource() {
    const resource = this.props.content_entry.content_entry.resource;

    switch(resource.type) {
      case "text":
        this.textObject(resource);
        break;
      default:
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

    console.log(resource, gallery_objects);

    blueimp.Gallery(gallery_objects, gallery_options);
  }

  textObject(resource) {
    alert(resource.text + "\n" + resource.text_content);
  }

  getVideoId(source) {
    const id = source.match(/\?v=([^$]+)/i)[1];
    const poster = `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;

    return {youtube: id, poster: poster};
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
