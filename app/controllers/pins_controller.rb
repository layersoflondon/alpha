class PinsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
  end

  def search
    Rails.logger.info("\n\n#{params.awesome_inspect}\n\n")
    title_prefix = params[:search].try(:[], :search_query).present? ? "#{params[:search].try(:[], :search_query).capitalize} " : ""

    # some default places to .sample...
    pin_places = [
      {
         id: 1,
         title: "#{title_prefix}Place",
         location: "Barking",
         resource: {type: "image", url: "http://cdn.londonandpartners.com/asset/d3a9f869f9f4bbd8fb1a3e6bf1124318.jpg"}
      },
      {
         id: 2,
         title: "#{title_prefix}Place",
         location: "Barking",
         resource: {type: "other", url: "http://cdn.londonandpartners.com/asset/d3a9f869f9f4bbd8fb1a3e6bf1124318.jpg"}
      },
      {
         id: 3,
         title: "#{title_prefix}Place",
         location: "Barking",
         resource: {type: "audio", url: "http://cdn.londonandpartners.com/asset/d3a9f869f9f4bbd8fb1a3e6bf1124318.jpg"}
      }
    ]

    # UAT Task 2 - Include overlays with images
    # UAT Task 4 - Find all pins about football (including the title prefix so the result names match the search term 'Football')

    latlng_1 = generate_latlng
    bounds_1 = [latlng_1, [latlng_1[0]-0.01, latlng_1[1]+0.02]]
    latlng_2 = generate_latlng
    bounds_2 = [latlng_2, [latlng_2[0]-0.01, latlng_2[1]+0.02]]

    json = {
       lat: 51.5421901,
       lng: 0.0830757,
       zoom: 13,
       searching: false,
       places: [
          {
             id: 1, title: "#{title_prefix}Place 1", location: "Barking"
          },
          {
             id: 2, title: "#{title_prefix}Place 2", location: "Barking"
          },
          {
             id: 3, title: "#{title_prefix}Place 3", location: "Dagenham"
          }
       ],
       overlays: [
          {
             id: 1,
             name: "RAF Aerial View",
             date_range: "1451 - 2013",
             url: "http://cdn.londonandpartners.com/asset/d3a9f869f9f4bbd8fb1a3e6bf1124318.jpg",
             bounds: generate_latlng_bounds
          },
          {
             id: 2,
             name: "RAF View",
             date_range: "1551 - 2010",
             url: "http://cdn.londonandpartners.com/asset/d3a9f869f9f4bbd8fb1a3e6bf1124318.jpg",
             bounds: generate_latlng_bounds
          }
       ],
       visible_overlays: [],
       collections: [
         {id: 1, name: "Parks of Barking"}
       ],
       pins: [
          {
             id: 1,
             title: "#{title_prefix}Pin 1",
             location: "Barking",
             position: generate_latlng,
             content_entries: pin_places.sample(rand(pin_places.size))
          },
          {
             id: 2,
             title: "#{title_prefix}Pin 2",
             location: "Dagenham",
             position: generate_latlng,
             content_entries: pin_places.sample(rand(pin_places.size))
          },
          {
             id: 3,
             title: "#{title_prefix}Pin 3",
             location: "Dagenham",
             position: generate_latlng,
             content_entries: pin_places.sample(rand(pin_places.size))
          }
       ]
    }

    # UAT Task 1 - Go to Broad Street
    if title_prefix =~ /broad st/i
      json[:lat] = 51.535044513278166
      json[:lng] = 0.15101909637451172
      json[:places] = [{id: 1, title: "Broad Street", location: "Dagenham"}];
      json[:pins]   = [{id: 1, title: "Broad Street", location: "Dagenham", position: [51.535044513278166, 0.15101909637451172], content_entries: []}]
    end

    if title_prefix =~ /barking park/i
      barking_park_title = "Barking Park"
      barking_image = "https://upload.wikimedia.org/wikipedia/commons/c/c1/Barking_Park,_The_Lake_-_geograph.org.uk_-_601621.jpg"
      barking_position = [51.544787102505786, 0.08600234985351562]
      barking_bounds   = [[51.544787102505786, 0.08600234985351562], [51.524787102505786, 0.13600234985351562]]

      barking_place = {id: 1, title: "#{barking_park_title} lake", location: "Barking", resource: {type: "image", url: barking_image}}

      json[:lat]      = barking_position[0]
      json[:lng]      = barking_position[1]
      json[:places]   = [barking_place]
      json[:overlays] = [{id: 1, name: "#{barking_park_title} lake", date_range: "1990 - 2016", url: barking_image, bounds: barking_bounds}]
      json[:pins]     = []

      json[:pins].push({id: 1, title: "Barking Park", location: "Barking", position: barking_position, content_entries: [barking_place]});
      json[:pins].push({id: 2, title: "Parsloes Park", location: "Dagenham", position: [51.5437522, 0.1328339], content_entries: []});
      json[:pins].push({id: 3, title: "The Leys", location: "Dagenham", position: [51.5345465, 0.1601853], content_entries: []});
      json[:pins].push({id: 4, title: "Broad Street", location: "Dagenham", position: [51.535044513278166, 0.15101909637451172], content_entries: []});
      json[:pins].push({id: 5, title: "Goresbrook Park", location: "Dagenham", position: [51.5353284, 0.1389512], content_entries: []});
    end

    # UAT Test 3 - Re-label our default content as Sam Morris'
    if title_prefix =~ /Sam Morris/i
      position = [51.544787102505786, 0.08600234985351562]
      json[:pins]   = json[:pins].collect{|p| p[:title] = "Sam Morris #{p[:name]}" ; p}
      json[:places] = json[:places].collect{|p| p[:name] = "Sam Morris #{p[:name]}" ; p}
      json[:pins].push({id: 4, title: "Sam Morris's custom content", location: "Barking", position: position, content_entries: []})
    end

    # UAT Test 4 - Football results
    if title_prefix =~ /^football/i
      position = [51.544787102505786, 0.08600234985351562]
      json[:lat] = position[0]
      json[:lng] = position[1]

      football_place_id = json[:places].last[:id]+1
      football_image    = "https://spen666.files.wordpress.com/2013/02/20130227-barking-fc-v-afc-wimbledon-035.jpg"
      football_resource = {type: "image", url: football_image}
      football_place    = {id: football_place_id, title: "Barking FC", location: "Barking", resource: football_resource}
      json[:places]     = [{id: 1, title: "Barking", location: "Barking and Dagenham", resource: {type: "image", url: "http://cdn.londonandpartners.com/asset/d3a9f869f9f4bbd8fb1a3e6bf1124318.jpg"}}];

      football_pin_id   = json[:pins].last[:id]+1
      json[:pins]       = [{id: football_pin_id, title: "Barking FC", location: "Barking", position: [51.544787102505786, 0.08600234985351562], content_entries: [football_place]}];

      football_overlay_id = json[:overlays].last[:id]+1
      football_image   = "https://spen666.files.wordpress.com/2013/02/20130227-barking-fc-v-afc-wimbledon-035.jpg"
      football_bounds  = [[51.544787102505786, 0.0900234985351562], [51.524787102505786, 0.14000234985351562]]
      football_resource= {type: "image", url: football_image}
      football_overlay = {id: football_overlay_id, name: "Barking FC - #{title_prefix}", date_range: "2000 - 2016", url: football_image, bounds: football_bounds}
      json[:overlays]  = [football_overlay]

      football_image   = "http://wearescl.co.uk/images/FootballAcademyLogos/rsz_barkinglogo.png"
      football_bounds  = [[51.549787102505786, 0.0850234985351562], [51.529787102505786, 0.12000234985351562]]
      football_overlay = {id: football_overlay_id+1, name: "Barking FC badge - #{title_prefix}", date_range: "2000 - 2016", url: football_image, bounds: football_bounds}
      json[:overlays].push(football_overlay)
    end

    Rails.logger.info("\n\nReturning...\n#{json.awesome_inspect}\n\n")

    # add any other matching pins that the user has added
    if title_prefix.present?
      pins = User.first.pins.where("title LIKE '%#{title_prefix.strip}%' AND created_at > '#{Date.today.midnight}'").limit(5)
      json[:places] = [{id: 1, title: "Barking", location: "Barking and Dagenham", resource: {type: "image", url: "http://cdn.londonandpartners.com/asset/d3a9f869f9f4bbd8fb1a3e6bf1124318.jpg"}}];
    else
      pins = User.first.pins.where("created_at > '#{Date.today.midnight}'").limit(5)

      json[:places] = []
      json[:pins]   = []
    end

    pins.each do |pin|
      @pin = pin
      pin_json = JSON.parse(view_context.render 'pins/pin')
      json[:pins].unshift(pin_json)
    end

    return render json: json
  end

  def show
    @pin = Pin.find(params[:id])
  end

  def create
    Rails.logger.info(params.awesome_inspect)
    Rails.logger.info(pin_params.awesome_inspect)

    @pin = Pin.create!(pin_params)
  end

  private
  def pin_params
    params.require(:pin).permit!
  end

  def generate_latlng
    [rand(51.504719..51.584719).round(20), (rand(-0.06..0.2).round(20))]
  end

  def generate_latlng_bounds
    lat = rand(51.504719..51.584719)
    lng = rand(0.065436..0.105436)

    [[lat, lng], [(lat)-0.02, (lng)+0.02]]
  end
end
