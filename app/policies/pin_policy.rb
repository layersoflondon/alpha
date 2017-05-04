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
  # user or that it is an 'open' collection that can be added to by other users
  def user_can_write_to_collection?
    record.collection.nil? || (record.collection.user_collection.user == user || record.collection.user_collection.open?)
  end
end
