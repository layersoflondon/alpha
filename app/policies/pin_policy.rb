class PinPolicy < ApplicationPolicy

  def show?
    true
  end

  def create?
    user.present?
  end

  def edit?
    user.pins.include?(record)
  end

  class Scope < Scope
    def resolve
      scope
    end
  end
end
