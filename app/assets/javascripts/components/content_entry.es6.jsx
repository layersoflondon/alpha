class ContentEntry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {show_text: false, text: "", text_content: ""}
  }

  showResource() {
    const content = this.props.content_entry;

    overlay = new ContentOverlay(content);
    overlay.render();
  }

  //mediaObject(content) {
  //  console.log(content);
  //  const resource = content.content_entry.resource;
  //  const resource_attribute = resource.type + "_path";
  //
  //  var gallery_objects = [];
  //  var gallery_options = {
  //    container: '#blueimp-gallery', carousel: true, closeOnSlideClick: false, closeOnEscape: true, startSlideshow: true, toggleControlsOnReturn: false, toggleControlsOnSlideClick: false,
  //    onopened: function(){
  //      let $container = $(this.container[0]);
  //      $container.addClass(`${this.list[0].content_type}-content-type blueimp-gallery-controls`);
  //    },
  //    onclose: function() {
  //      let $container = $(this.container[0]);
  //      $container.removeClass(`${this.list[0].content_type}-content-type`);
  //      let $slide = $container.find('.slide');
  //    },
  //    onslide: function(index, slide) {
  //      // add the content type to the slide container
  //      let $container = $(this.container[0]);
  //
  //      let title_text       = this.list[index].title;
  //      let description_text = this.list[index].description;
  //      let info_text = this.list[index].info;
  //
  //      let $title_container       = $container.find('.title');
  //      let $description_container = $container.find('.description');
  //      let $info_container = $container.find('.info');
  //      let $link_url_container    = $container.find('.link-url');
  //
  //      $title_container.html(title_text);
  //      $description_container.html(description_text);
  //      $info_container.html(info_text);
  //
  //      /*
  //      if we're rendering a dataset or text object, remove the 'slide-loading' class
  //      and render a file download ui element, in place of a typical media gallery element
  //      */
  //      if(this.list[index].content_type.match(/text|dataset/)) {
  //        let $slide = $container.find('.slide');
  //        let $slide_container = $slide.parent();
  //        $slide.removeClass('slide-loading').html('');
  //
  //        if(typeof resource[resource_attribute] !== "undefined") {
  //          let icon = LoL.urls[resource.type];
  //
  //          $slide.append(`<div class='m-note-text-download'><p class="btn"><a target="_blank" href=${resource[resource_attribute]}>${icon} Download ${title_text}</a></p></div>`);
  //        }else {
  //          $slide.append("<!--<div class='m-note-text-download'><p>No download available</p></div>-->");
  //        }
  //
  //        if(resource.type === "text") {
  //          $slide.append(`<div class="m-note-text-content"><p>${resource.text}</p></div>`);
  //        }
  //      }
  //    }
  //  };
  //
  //
  //  let description = "";
  //
  //  if(typeof content.description !== "undefined" && content.description !== null && content.description.length) {
  //    description += `${content.description}`;
  //  }
  //
  //  let info = "";
  //
  //  if(typeof content.pinned_on_date !== "undefined" && content.pinned_on_date !== null){
  //    info += `Pinned on: <strong>${content.pinned_on_date}</strong><br/>`;
  //  }
  //
  //  info += `Location: <strong>${content.location}</strong><br/>`;
  //
  //  const date_from = content.date_from;
  //  const date_to   = content.date_to;
  //
  //  if(typeof date_from !== "undefined" && typeof date_to !== "undefined") {
  //    info += `Content Date: <br/><strong>${date_from}</strong> to <strong>${date_to}</strong>`;
  //  }else if(typeof date_from !== "undefined") {
  //    info += `Content Date: <strong>${date_from}</strong>`;
  //  }
  //
  //  if(typeof content.link_url !== "undefined") {
  //    info += `<br/>Link: <a href="${content.link_url}">${content.link_url}</a>`;
  //  }
  //
  //  // we're embedding a media item from youtube
  //  if(resource.embedded_resource) {
  //    const source   = resource["href"];
  //    const yt_attrs = this.getVideoId(source);
  //
  //    var video_object = {
  //      title:  content.title,
  //      href:   source,
  //      type:   "text/html",
  //      content_type: "video",
  //      description: description,
  //      info: info
  //    };
  //
  //    _.merge(video_object, yt_attrs);
  //
  //    gallery_objects.push(video_object);
  //
  //    // change the default gallery options
  //    gallery_options['youTubeClickToPlay'] = false;
  //  }else {
  //    gallery_objects.push({
  //      title: content.title,
  //      href: resource[resource_attribute],
  //      type: resource.mime_type,
  //      content_type: resource.type,
  //      poster: resource.poster,
  //      description: description,
  //      info: info
  //    });
  //  }
  //
  //  blueimp.Gallery(gallery_objects, gallery_options);
  //  $("#blueimp-gallery").find('video').attr('controls', true).attr('autoplay', true);
  //}



  editContentEntry() {
    // the 'content_entry' in the props is a Note, displayed as a list item
    MapPinActions.editNote(this.props.content_entry);
  }

  editNoteLocation() {
    MapPinActions.editNoteLocation(this.props.content_entry);
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
          <div className="icon" dangerouslySetInnerHTML={{__html: LoL.urls[this.props.content_entry.content_entry.resource.type]}}>
          </div>

          <h3>{this.props.content_entry.content_entry.title}</h3>
          {text}
          {pinned}
        </a>
      );
    }

    let edit_note_button = '';
    let edit_location_button = '';

    if(this.props.content_entry.editable) {
      edit_note_button     = <span className="edit-button" onClick={this.editContentEntry.bind(this)}><i className="fa fa-pencil" aria-hidden="true"></i></span>;
      edit_location_button = <span className="edit-button" onClick={this.editNoteLocation.bind(this)}><i className="fa fa-map-marker" aria-hidden="true"></i></span>;
    }

    return (
      <li>
      {this.props.id}
        {edit_note_button} 

        {link}
      </li>
    );
  }
}
