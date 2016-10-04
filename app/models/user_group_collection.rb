class UserGroupCollection < ActiveRecord::Base
  belongs_to :user_group
  belongs_to :collection

  validates :user_group, :collection, presence: true
  validates :collection, uniqueness: true
end
