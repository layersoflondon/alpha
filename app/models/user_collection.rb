class UserCollection < ActiveRecord::Base
  belongs_to :user, inverse_of: :user_collections
  belongs_to :collection, inverse_of: :user_collection

  validates :user, :collection, presence: true
  validates :collection, uniqueness: true
end
