class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :pins

  has_many :user_group_users, -> {extending UserGroupStates}
  has_many :user_groups, -> {extending UserGroupStates}, through: :user_group_users

  has_many :user_collections, inverse_of: :user, dependent: :destroy
  has_many :collections, through: :user_collections

  validates :first_name, :last_name, presence: true

  def name
    "#{first_name} #{last_name}"
  end

  def has_invite_to_group?(group)
    user_groups.group_invitation(group).present?
  end
end
