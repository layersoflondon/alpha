class UserGroupUser < ActiveRecord::Base
  belongs_to :user
  belongs_to :user_group

  validates :user, :user_group, presence: true
end
