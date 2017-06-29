class CollectionPolicy < ApplicationPolicy
  def user_can_add_pin_to_collection?
    if record.user_group.present?
      record.user_group.users.include?(user)
    else
      record.user_collection.user_id == user.id
    end
  end

  class Scope < Scope
    def resolve
      scope
    end
  end
end
