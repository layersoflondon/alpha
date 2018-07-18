class ContentEntryPolicy < ApplicationPolicy
  def download?
    # user.present?
  end

  class Scope < Scope
    def resolve
      scope
    end
  end
end
