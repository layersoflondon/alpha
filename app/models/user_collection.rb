class UserCollection < ActiveRecord::Base
  belongs_to :user
  belongs_to :collection

  validates :user, :collection, presence: true
  validates :collection, uniqueness: true
end
