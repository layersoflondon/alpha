class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :user_group_users
  has_many :user_groups, through: :user_group_users
  has_many :primary_user_groups, class_name: "UserGroup", foreign_key: :primary_user_id
end
