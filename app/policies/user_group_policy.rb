class UserGroupPolicy < ApplicationPolicy
  def accept?
    user.has_invite_to_group?(record.user_group) && record.invitation_state=="invited"
  end

  def reject?
    accept?
  end

  def invite?
    record.users.include?(user)
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

  def is_member_of_group?
    record.users.include?(user)
  end

  class Scope < Scope
    def resolve
      scope
    end
  end
end
