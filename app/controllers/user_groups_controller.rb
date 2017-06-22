class UserGroupsController < ApplicationController
  def index
    @groups = UserGroup.all

    if params[:query]
      @groups = @groups.where("name like ?", "%#{params[:query]}%")
    end

    Rails.logger.info("\n\n\n#{request.format} \n\n\n")

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

      redirect_to user_group_path(@group), notice: "Your team was created"
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
    render json: {}, status: :ok
  end

  def accept
    invite = UserGroupUser.find(params[:id])

    if UserGroupPolicy.new(current_user, invite).accept?
      invite.accept!
      redirect_to :back, notice: "You are now a member of the <strong>#{invite.user_group.name} team</strong>!"
    else
      message = invite.invitation_state=="requested" ? "can't approve your own request" : "not invited to this team"
      raise Pundit::NotAuthorizedError, message
    end
  end

  def reject
    render json: {}, status: :ok
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
