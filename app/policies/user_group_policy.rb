class UserGroupPolicy < ApplicationPolicy
  def accept?
    user.has_invite_to_group?(record.user_group)
  end

  class Scope < Scope
    def resolve
      scope
    end
  end
end
