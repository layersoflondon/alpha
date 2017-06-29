class InvitationsController < Devise::InvitationsController
  before_filter :update_invitation_params, only: :update

  private
  def update_invitation_params
    devise_parameter_sanitizer.permit(:accept_invitation, keys: [:first_name, :last_name])
  end

  def after_accept_path_for(user)
    if user.user_groups.invitations.any?
      flash[:notice] = "Welcome to Layers of London. Please take a look at your pending team invites..."
      edit_user_registration_path
    else
      root_path
    end
  end
end
