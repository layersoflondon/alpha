class UserGroupsController < ApplicationController
  def index
    @groups = UserGroup.all

    if params[:query]
      @groups = @groups.where("name like ?", "%#{params[:query]}%")
    end

    respond_to do |format|
      format.html
      format.json do
        @groups = @groups.where.not(id: current_user.user_groups.collect(&:id)) # dont return the user's current groups
        render json: {teams: @groups}, status: :ok
      end
    end
  end

  def edit
    redirect_to user_groups_path, notice: "Edit not available"
  end

  def show
    @group = UserGroup.find(params[:id])
  end

  def create
    @group = UserGroup.new(user_group_params.merge({primary_user_id: current_user.id}))

    if @group.save
      @group.invite_user!(current_user).accept!

      if params[:user_group].has_key?(:redirect_to)
        redirect_path = params[:user_group][:redirect_to]
        notice = "Welcome! You're signed up and we created your team"
      else
        redirect_path = user_group_path(@group)
        notice ="Your team was created"
      end

      redirect_to redirect_path, notice: notice
    else
      session[:user_group_errors] = @group.errors
      session[:user_group] = @group
      redirect_to :back, notice: "Couldn't save your team."
    end
  end

  def update
  end

  def destroy
    group = UserGroup.find(params[:id])
    authorize group

    group.destroy!
    redirect_to edit_user_registration_path, notice: "This team has been removed"
  end

  def invite
    user = User.find_by(email: params[:email])
    @group = UserGroup.find(params[:id])

    authorize @group
    # fixme anybody can invite anybody to a group, regardless of whether they're the group's primary user. is that right?
    if @group
      if user # existing user, add their invite
        @group.invite_user!(user)
      else # user doesn't exist. invite them and add the user group invite
        user = User.invite!(email: params[:email])
        @group.invite_user!(user)
      end

      redirect_to :back, notice: "The user was invited"
    else
      redirect_to :back
    end
  end

  def accept
    invite = UserGroupUser.find(params[:id])

    if UserGroupPolicy.new(current_user, invite).accept?
      invite.accept!
      redirect_to :back, notice: "You are now a member of the <strong>#{invite.user_group.name}</strong> team!"
    else
      message = invite.invitation_state=="requested" ? "can't approve your own request" : "not invited to this team"
      raise Pundit::NotAuthorizedError, message
    end
  end

  def reject
    invite = UserGroupUser.find(params[:id])

    if UserGroupPolicy.new(current_user, invite).reject?
      invite.reject!
      redirect_to :back
    else
      message = invite.invitation_state=="requested" ? "can't reject that request" : "not invited to this team"
      raise Pundit::NotAuthorizedError, message
    end
  end

  def remove
    render json: {}, status: :ok
  end

  def request_invite
    group = UserGroup.find(params[:id])
    if UserGroupPolicy.new(current_user, group).request_invite?
      group.invite_user!(current_user).request_invite!
      redirect_to :back, notice: "Your request has been sent"
    else
      raise Pundit::NotAuthorizedError, "you can not request an invite to this team"
    end
  end

  def approve_request
    group_user = UserGroupUser.find(params[:id])

    if UserGroupPolicy.new(current_user, group_user).approve_request?
      group_user.accept_request!
      redirect_to :back, notice: "The request was approved"
    else
      raise Pundit::NotAuthorizedError, "we couldn't authorise that request"
    end
  end

  def reject_request
    group_user = UserGroupUser.find(params[:id])

    if UserGroupPolicy.new(current_user, group_user).reject_request?
      group_user.reject_request!
      redirect_to :back, notice: "The request was rejected"
    else
      raise Pundit::NotAuthorizedError, "we couldn't authorise that request"
    end
  end

  private
  def user_group_params
    params.require(:user_group).permit(:name)
  end

  def user_group_invite_params
    params.permit(:user_group_id, :user_id)
  end
end
