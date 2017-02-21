class ContentOverlay {

  constructor(content) {
    this.content = content;
  }


  render() {
    var content = this.content;
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
        let $slide = $container.find('.slide');
      },
      onslide: function(index, slide) {
        // add the content type to the slide container
        let $container = $(this.container[0]);

        let title_text       = this.list[index].title;
        let description_text = this.list[index].description;
        let info_text = this.list[index].info;

        let $title_container       = $container.find('.title');
        let $description_container = $container.find('.description');
        let $info_container = $container.find('.info');
        let $link_url_container    = $container.find('.link-url');

        $title_container.html(title_text);
        $description_container.html(description_text);
        $info_container.html(info_text);

        /*
         if we're rendering a dataset or text object, remove the 'slide-loading' class
         and render a file download ui element, in place of a typical media gallery element
         */
        if(this.list[index].content_type.match(/text|dataset/)) {
          let $slide = $container.find('.slide');
          let $slide_container = $slide.parent();
          $slide.removeClass('slide-loading').html('');

          if(typeof resource[resource_attribute] !== "undefined") {
            let icon = LoL.urls[resource.type];

            $slide.append(`<div class='m-note-text-download'><p class="btn"><a target="_blank" href=${resource[resource_attribute]}>${icon} Download ${title_text}</a></p></div>`);
          }else {
            $slide.append("<!--<div class='m-note-text-download'><p>No download available</p></div>-->");
          }

          if(resource.type === "text") {
            $slide.append(`<div class="m-note-text-content"><p>${resource.text}</p></div>`);
          }
        }
      }
    };


    let description = "";

    if(typeof content.description !== "undefined" && content.description !== null && content.description.length) {
      description += `${content.description}`;
    }

    let info = "";

    if(typeof content.pinned_on_date !== "undefined" && content.pinned_on_date !== null){
      info += `Pinned on: <strong>${content.pinned_on_date}</strong><br/>`;
    }

    info += `Location: <strong>${content.location}</strong><br/>`;

    const date_from = content.date_from;
    const date_to   = content.date_to;

    if(typeof date_from !== "undefined" && typeof date_to !== "undefined") {
      info += `Content Date: <br/><strong>${date_from}</strong> to <strong>${date_to}</strong>`;
    }else if(typeof date_from !== "undefined") {
      info += `Content Date: <strong>${date_from}</strong>`;
    }

    if(typeof content.link_url !== "undefined") {
      info += `<br/>Link: <a href="${content.link_url}">${content.link_url}</a>`;
    }
    // if(typeof content.id !== "undefined") {
    //   let url = $('meta[name=map-url]').attr('content') + "#/pins/" + content.id;
    //   info += `<br/>Link to this note: <a href="${url}">${url}</a>`;
    // }
    //info += `<br/>Inappropriate content? <a class="flag-content"><i class="fa fa-flag"></i> Flag for review</a>`;

    // we're embedding a media item from youtube
    if(resource.embedded_resource) {
      const source   = resource["href"];
      const yt_attrs = this.getVideoId(source);

      var video_object = {
        title:  content.title,
        href:   source,
        type:   "text/html",
        content_type: "video",
        description: description,
        info: info
      };

      _.merge(video_object, yt_attrs);

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
        description: description,
        info: info
      });
    }
    blueimp.Gallery(gallery_objects, gallery_options);
    $("#blueimp-gallery").find('video').attr('controls', true).attr('autoplay', true);

  }

  getVideoId(source) {
    const id = source.match(/http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/)[1];
    const poster = `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;

    return {youtube: id, poster: poster};
  }

}
