class SessionsController < Devise::SessionsController

  def new
    session[:adding_pin] = true if params[:adding_pin].present?
    super
  end

  private

  def after_sign_in_path_for(user)
    if session[:adding_pin]
      page_path("the-map", anchor: "/add")
    else
      root_path
    end
  end
end