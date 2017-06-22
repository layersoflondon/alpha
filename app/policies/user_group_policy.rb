class UserGroupPolicy < ApplicationPolicy
  def accept?
    user.has_invite_to_group?(record.user_group)
  end

  def request_invite?
    !user.user_group_users.find{|ug| ug.user_group_id == record.id}
  end

  class Scope < Scope
    def resolve
      scope
    end
  end
end
