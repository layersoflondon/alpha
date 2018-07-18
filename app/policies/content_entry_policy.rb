class ContentEntryPolicy < ApplicationPolicy
  def download?
    # user.present?
    true
  end

  class Scope < Scope
    def resolve
      scope
    end
  end
end
