class UserGroupsController < ApplicationController
  def index
    @groups = UserGroup.all
    if params[:query]
      @groups = groups.where("name like ?", "%#{params[:query]}%")
    end

    respond_to do |format|
      format.html
      format.json do
        render json: {teams: @groups}, status: :ok
      end
    end
  end

  def edit
    render plain: "OK"
  end

  def show
  end

  def create
    render plain: "OK"
  end

  def update
    render plain: "OK"
  end

  def destroy
    render plain: "OK"
  end

  def invite
    render json: {}, status: :ok
  end

  def accept
    group = UserGroup.find(params[:id])
    invite = current_user.user_group_users.group_invitation(group)

    if UserGroupPolicy.new(current_user, invite).accept?
      invite.accept!
      redirect_to :back, notice: "You are now a member of the <strong>#{group.name} team</strong>!"
    else
      raise Pundit::NotAuthorizedError, "not invited to this group"
    end
  end

  def reject
    render json: {}, status: :ok
  end

  def remove
    render json: {}, status: :ok
  end
end
