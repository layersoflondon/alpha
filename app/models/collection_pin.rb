class CollectionPin < ActiveRecord::Base
  include AASM
  belongs_to :pin
  belongs_to :collection

  validates :pin, :collection, presence: true
  aasm do
    state :pending, initial: -> {true} #unless the collection belongs to a user
    state :approved


  end

  def is_group_collection_pin?
    collection.user_group.present?
  end
end
