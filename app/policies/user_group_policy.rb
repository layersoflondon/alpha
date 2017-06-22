class UserGroupPolicy < ApplicationPolicy
  def accept?
    user.has_invite_to_group?(record.user_group) && record.invitation_state=="invited"
  end

  def invite?
    !user.has_invite_to_group?(record)
  end

  def request_invite?
    !user.user_group_users.find{|ug| ug.user_group_id == record.id}
  end

  def approve_request?
    record.user_group.primary_user == user
  end

  def reject_request?
    record.user_group.primary_user == user
  end

  def destroy?
    is_group_admin?
  end

  def is_group_admin?
    record.primary_user == user
  end

  class Scope < Scope
    def resolve
      scope
    end
  end
end
