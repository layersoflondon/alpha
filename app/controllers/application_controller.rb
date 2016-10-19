class ApplicationController < ActionController::Base
  include SimpleErrors::Rescue
  rescue_with_not_found Rooftop::RecordNotFoundError, Rooftop::Rails::AncestorMismatch, ActionController::RoutingError
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  before_rescue do
    get_navigation_menus
    get_global_content
  end

  protect_from_forgery with: :exception

  before_action :get_navigation_menus
  before_action :get_global_content
  before_action :allow_caching

  def fetch
    Rails.logger.info("\n\n#{params.awesome_inspect}\n\n")
    title_prefix = params[:search].try(:[], :search_query).present? ? "#{params[:search].try(:[], :search_query).capitalize} " : ""

    pin_places = [{id:1, name: "#{title_prefix}Pin, Place 1"}, {id: 2, name: "#{title_prefix}Pin, Place 2"}, {id:3, name: "#{title_prefix}Pin, Place 3"}, {id:4, name: "#{title_prefix}Pin, Place 4"}]

    # UAT Task 2 - Include overlays with images
    # UAT Task 4 - Find all pins about football (including the title prefix so the result names match the search term 'Football')

    latlng_1 = generate_latlng
    bounds_1 = [latlng_1, [latlng_1[0]-0.01, latlng_1[1]+0.02]]
    latlng_2 = generate_latlng
    bounds_2 = [latlng_2, [latlng_2[0]-0.01, latlng_2[1]+0.02]]

    json = {
      places: [
        {id:1, name: "#{title_prefix}Place 1"},
        {id:2, name: "#{title_prefix}Place 2"},
        {id:3, name: "#{title_prefix}Place 3"}
      ],
      overlays:[
        {id: 1, name: "#{title_prefix}Overlay 1", date_range: "1451 - 2013", url: "http://cdn.londonandpartners.com/asset/d3a9f869f9f4bbd8fb1a3e6bf1124318.jpg", bounds: bounds_1},
        {id: 2, name: "#{title_prefix}Overlay 2", date_range: "1551 - 2016", url: "http://cdn.londonandpartners.com/asset/d3a9f869f9f4bbd8fb1a3e6bf1124318.jpg", bounds: bounds_2}
      ],
      collections:[
        {id: 1, name: "#{title_prefix} matching collection"}
      ],
      pins:[
        {id: 1, name: "#{title_prefix}Pin 1", position: generate_latlng(), places: pin_places.sample(1)},
        {id: 2, name: "#{title_prefix}Pin 2", position: generate_latlng(), places: pin_places.sample(2)},
        {id: 3, name: "#{title_prefix}Pin 3", position: generate_latlng(), places: pin_places.sample(2)},
        {id: 4, name: "#{title_prefix}Pin 4", position: generate_latlng(), places: pin_places.sample(3)},
        {id: 5, name: "#{title_prefix}Pin 5", position: generate_latlng(), places: pin_places.sample(4)}
      ]
    }

    # UAT Task 1 - Go to Broad Street
    if title_prefix =~ /broad st/i
      json[:lat] = 51.535044513278166
      json[:lng] = 0.15101909637451172
      json[:pins].push({id: 6, name: "#{title_prefix} Location", position: [51.535044513278166, 0.15101909637451172], places: []})
    end

    if title_prefix =~ /barking park/i
      barking_park_title = ["Barking Park", title_prefix].join(' - ')
      barking_place = {id: 1, name: barking_park_title}
      barking_image = "https://upload.wikimedia.org/wikipedia/commons/c/c1/Barking_Park,_The_Lake_-_geograph.org.uk_-_601621.jpg"
      barking_position = [51.544787102505786, 0.08600234985351562]
      barking_bounds   = [[51.544787102505786, 0.08600234985351562], [51.524787102505786, 0.13600234985351562]]

      json[:lat]      = barking_position[0]
      json[:lng]      = barking_position[1]
      json[:places]   = [barking_place]
      json[:pins]     = [{id: 1, name: "#{barking_park_title} lake", position: barking_position, places: [barking_place]}]
      json[:overlays] = [{id: 1, name: "#{barking_park_title} lake", date_range: "1990 - 2016", url: barking_image, bounds: barking_bounds}]
    end

    # UAT Test 3 - Re-label our default content as Sam Morris'
    if title_prefix =~ /content/i && title_prefix =~ /Sam Morris/i
      json[:pins]   = json[:pins].collect{|p| p[:name] = "Sam Morris #{p[:name]}" ; p}
      json[:places] = json[:places].collect{|p| p[:name] = "Sam Morris #{p[:name]}" ; p}
    end

    # UAT Test 4 - Football results
    if title_prefix =~ /^football/i
      position = [51.544787102505786, 0.08600234985351562]
      json[:lat] = position[0]
      json[:lng] = position[1]

      football_place_id = json[:places].last[:id]+1
      football_place    = {id: football_place_id, name: "Barking FC"}
      json[:places].push(football_place)

      football_pin_id   = json[:pins].last[:id]+1
      json[:pins].unshift({id: football_pin_id, name: "Barking FC", position: [51.544787102505786, 0.08600234985351562], places: [football_place]})

      football_overlay_id = json[:overlays].last[:id]+1
      football_image   = "https://spen666.files.wordpress.com/2013/02/20130227-barking-fc-v-afc-wimbledon-035.jpg"
      football_bounds  = [[51.544787102505786, 0.0900234985351562], [51.524787102505786, 0.14000234985351562]]
      football_overlay = {id: football_overlay_id, name: "Barking FC - #{title_prefix}", date_range: "2000 - 2016", url: football_image, bounds: football_bounds}
      json[:overlays]  = [football_overlay]

      football_image   = "http://wearescl.co.uk/images/FootballAcademyLogos/rsz_barkinglogo.png"
      football_bounds  = [[51.549787102505786, 0.0850234985351562], [51.529787102505786, 0.12000234985351562]]
      football_overlay = {id: football_overlay_id+1, name: "Barking FC badge - #{title_prefix}", date_range: "2000 - 2016", url: football_image, bounds: football_bounds}
      json[:overlays].push(football_overlay)
    end

    Rails.logger.info("\n\nReturning...\n#{json.awesome_inspect}\n\n")

    return render json: json
  end

  private
  def generate_latlng
    [rand(51.450..51.550).round(20), (rand(-0.06..0.2).round(20))]
  end

  def get_navigation_menus
    @main_navigation_menu, @footer_navigation_menu = *Rooftop::Menus::Menu.where(post__in: [2,3]).to_a.sort_by(&:id)
  end

  def get_global_content
  end

  def allow_caching
    expires_in(10.seconds, public: true)
  end
end
