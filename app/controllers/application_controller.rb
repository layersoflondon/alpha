class ApplicationController < ActionController::Base
  include Pundit
  include SimpleErrors::Rescue
  rescue_with_not_found Rooftop::RecordNotFoundError, Rooftop::Rails::AncestorMismatch, ActionController::RoutingError

  rescue_from Pundit::NotAuthorizedError do |exception|
    if request.format == "application/json"
      render json: {errors: [exception.message]}, status: :unprocessable_entity
    end
  end

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

  def tmp
    render plain: ""
  end

  private
  def get_navigation_menus
    @main_navigation_menu, @footer_navigation_menu = *Rooftop::Menus::Menu.where(post__in: [2,3]).to_a.sort_by(&:id)

    routes = Rails.application.routes.url_helpers

    if signed_in?
      account_menu_items = [
        OpenStruct.new({className: "", object_type: "page", object_ancestor_slugs: routes.destroy_user_session_path.split('/').reject(&:empty?)[0...-1], object_slug: routes.destroy_user_session_path.split('/').last, title: "Sign out"}),
        OpenStruct.new({className: "", object_type: "page", object_ancestor_slugs: routes.edit_user_registration_path.split('/').reject(&:empty?)[0...-1], object_slug: routes.edit_user_registration_path.split('/').last, title: "My account"})
      ]
    else
      account_menu_items = [
        OpenStruct.new({className: "", object_type: "page", object_ancestor_slugs: routes.new_user_session_path.split('/').reject(&:empty?)[0...-1], object_slug: routes.new_user_session_path.split('/').last, title: "Sign in"}),
        OpenStruct.new({className: "", object_type: "page", object_ancestor_slugs: routes.new_user_registration_path.split('/').reject(&:empty?)[0...-1], object_slug: routes.new_user_registration_path.split('/').last, title: "Create account"})
      ]
    end

    @account_menu = OpenStruct.new({items: account_menu_items})
  end

  def get_global_content
  end

  def allow_caching
    expires_in(10.seconds, public: true)
  end
end
