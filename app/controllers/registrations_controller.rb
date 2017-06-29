class RegistrationsController < Devise::RegistrationsController

  def new
    session[:adding_pin] = true if params[:adding_pin].present?
    super
  end

  def join_team
  end

  private
  def after_sign_up_path_for(user)
    if session[:adding_pin]
      page_path("the-map", anchor: "/add")
    else
      users_join_team_path
    end
  end

  def sign_up_params
    params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation)
  end

  def account_update_params
    params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation, :current_password)
  end


end