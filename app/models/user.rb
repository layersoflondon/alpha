class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :pins

  has_many :user_group_users, -> {extending UserGroupStates}
  has_many :user_groups, -> {extending UserGroupStates}, through: :user_group_users
  has_many :user_group_collections, through: :user_groups
  accepts_nested_attributes_for :user_groups

  has_many :user_collections, inverse_of: :user, dependent: :destroy
  has_many :collections, through: :user_collections
  accepts_nested_attributes_for :collections

  validates :first_name, :last_name, presence: true

  def name
    "#{first_name} #{last_name}"
  end

  def has_invite_to_group?(group)
    user_groups.group_invitation(group).present?
  end

  def primary_user_group_users_with_pending_requests
    UserGroupUser.includes(:user_group).where({user_groups: {primary_user_id: self.id}, user_group_users: {invitation_state: "requested"}})
  end
end
