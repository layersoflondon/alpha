class PinPolicy < ApplicationPolicy

  def show?
    true
  end

  def create?
    user.present? && user_can_write_to_collection?
  end

  def update?
    user.pins.include?(record)
  end

  class Scope < Scope
    def resolve
      scope
    end
  end

  private

  # if the pin is being added to a collection, check that the collection is owned by the current
  # user or that it is an 'open' collection that can be added to by other users.
  # if it is a team collection, also check that the user is a member of that team
  def user_can_write_to_collection?
    if record.collections.any?
      user_collections = record.collections.select{|c| c.user_collection.present?}
      team_collections = record.collections.select{|c| c.user_group_collection.present?}

      open_for_users = user_collections.all?{|c| c.user_collection.user_id == user.id || c.user_collection.open?}
      user_is_a_member = team_collections.collect(&:user_group).all?{|g| user.user_groups.include?(g)}

      open_for_users && user_is_a_member
    else
      true
    end
  end
end
