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
    title_prefix = params[:search].try(:[], :search_query).present? ? "#{params[:search].try(:[], :search_query)} " : ""

    pin_places = [{id:1, name: "Pin 3, Place 1"}, {id: 2, name: "Pin 3, Place 2"}, {id:3, name: "Pin 3, Place 3"}, {id:4, name: "Pin 3, Place 4"}]

    json = {
      places: [
        {id:1, name: "#{title_prefix}Place 1"},
        {id:2, name: "#{title_prefix}Place 2"},
        {id:3, name: "#{title_prefix}Place 3"}
      ],
      overlays:[
        {id: 1, name: "#{title_prefix}Overlay 1", date_range: "1451 - 2013", url: "http://cdn.londonandpartners.com/asset/d3a9f869f9f4bbd8fb1a3e6bf1124318.jpg", bounds: [generate_latlng, generate_latlng]},
        {id: 2, name: "#{title_prefix}Overlay 2", date_range: "1551 - 201", url: "http://cdn.londonandpartners.com/asset/d3a9f869f9f4bbd8fb1a3e6bf1124318.jpg", bounds: [generate_latlng, generate_latlng]}
      ],
      collections:[
        {id: 1, name: "#{title_prefix} matching collection"}
      ],
      pins:[
        {id: 1, name: "Pin 1", position: generate_latlng(), places: pin_places.sample(1)},
        {id: 2, name: "Pin 2", position: generate_latlng(), places: pin_places.sample(2)},
        {id: 3, name: "Pin 3", position: generate_latlng(), places: pin_places.sample(2)},
        {id: 4, name: "Pin 4", position: generate_latlng(), places: pin_places.sample(3)},
        {id: 5, name: "Pin 5", position: generate_latlng(), places: pin_places.sample(4)}
      ]
    }

    return render json: json
  end

  private
  def generate_latlng
    [rand(51.100..51.600).round(4), -(rand(0.05..0.25).round(4))]
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
