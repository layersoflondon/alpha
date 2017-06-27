class UserCollection < ActiveRecord::Base
  belongs_to :user, inverse_of: :user_collections
  belongs_to :collection, inverse_of: :user_collection

  validates :collection, presence: true
  validates :user, presence: true, on: :update
  validates :collection, uniqueness: true

  enum privacy: [:restricted, :open]

  after_initialize -> {Rails.logger.info "Got params: #{self.attributes.inspect}"}
end
