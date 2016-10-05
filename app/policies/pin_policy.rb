class PinPolicy < ApplicationPolicy

  def show?

  end

  def create?

  end

  def update?

  end

  def destroy?

  end



  class Scope < Scope
    def resolve
      scope
    end
  end
end
