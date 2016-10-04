class UserGroup < ActiveRecord::Base
  belongs_to :primary_user, class_name: "User"
  has_many :user_group_users
  has_many :users, through: :user_group_users

  validates :name, presence: true

  has_many :user_group_collections
  has_many :collections, through: :user_group_collections
end
