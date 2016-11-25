class ApplicationController < ActionController::Base
  include Pundit
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

  private
  def get_navigation_menus
    @main_navigation_menu, @footer_navigation_menu = *Rooftop::Menus::Menu.where(post__in: [2,3]).to_a.sort_by(&:id)
  end

  def get_global_content
  end

  def allow_caching
    expires_in(10.seconds, public: true)
  end
end
