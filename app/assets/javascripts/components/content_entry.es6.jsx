class ContentEntry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {show_text: false, text: "", text_content: ""}
  }

  showResource() {
    const content = this.props.content_entry;

    this.mediaObject(content);
  }

  mediaObject(content) {
    const resource = content.content_entry.resource;
    const resource_attribute = resource.type + "_path";

    var gallery_objects = [];
    var gallery_options = {
      container: '#blueimp-gallery', carousel: true, closeOnSlideClick: false, closeOnEscape: true, startSlideshow: true, toggleControlsOnReturn: false, toggleControlsOnSlideClick: false,
      onopened: function(){
        let $container = $(this.container[0]);
        $container.addClass(`${this.list[0].content_type}-content-type blueimp-gallery-controls`);
      },
      onclose: function() {
        let $container = $(this.container[0]);
        $container.removeClass(`${this.list[0].content_type}-content-type`);
      },
      onslide: function(index, slide) {
        // add the content type to the slide container
        let $container = $(this.container[0]);

        let title_text       = this.list[index].title;
        let description_text = this.list[index].description;

        let $title_container       = $container.find('.title');
        let $description_container = $container.find('.description');

        $title_container.html(title_text);
        $description_container.html(description_text);

        /*
        if we're rendering a dataset or text object, remove the 'slide-loading' class
        and render a file download ui element, in place of a typical media gallery element
        */
        if(this.list[index].content_type.match(/text|dataset/)) {
          let $slide = $(this.container.find('.slide')[0]);
          let $slide_container = $slide.parent();
          $slide.removeClass('slide-loading').html('');

          if(resource.type === "text") {
            $slide.append(`<p>${resource.text}</p>`);
          }

          if(typeof resource[resource_attribute] !== "undefined") {
            $slide.append(`<p class="btn"><a target="_blank" href=${resource[resource_attribute]}>Download ${title_text}</a></p>`);
          }else {
            $slide.append("<p>No download available</p>");
          }
        }
      }
    };

    let description = "";

    if(typeof content.description !== "undefined" && content.description.length) {
      description += `${content.description}<br/><br/>`;
    }

    description += `Pinned on: <strong>${content.pinned_on_date}</strong><br/>`
    description += `Location: <strong>${content.location}</strong><br/>`

    if(typeof content.date_to === "undefined") {
      description += `Content Date: <strong>${content.date_from}</strong>`
    }else {
      description += `Content Date: <br/><strong>${content.date_from}</strong> to <strong>${content.date_to}</strong>`
    }

    // we're embedding a media item from youtube
    if(resource.embedded_resource) {
      const source   = resource["href"];
      const yt_attrs = this.getVideoId(source);

      var video_object = {
        title:  content.title,
        href:   source,
        type:   "text/html",
        content_type: "video",
        description: description
      };

      _.merge(video_object, yt_attrs);

      console.log(resource, video_object);

      gallery_objects.push(video_object);

      // change the default gallery options
      gallery_options['youTubeClickToPlay'] = false;
    }else {
      gallery_objects.push({
        title: content.title,
        href: resource[resource_attribute],
        type: resource.mime_type,
        content_type: resource.type,
        poster: resource.poster,
        description: description
      });
    }

    blueimp.Gallery(gallery_objects, gallery_options);
    $("#blueimp-gallery").find('video').attr('controls', true).attr('autoplay', true);
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
