class CollectionPin < ActiveRecord::Base
  include AASM
  belongs_to :pin
  belongs_to :collection

  accepts_nested_attributes_for :collection

  validates :collection, presence: true
  validates :pin, presence: true, on: :update

  aasm do
    #if the collection belongs to a group, any pin additions need to be moderated by the group's primary user
    state :pending, initial: -> {is_group_collection_pin?}
    # if it's owned by a user, no moderation needed
    state :approved, initial: -> {is_user_collection_pin?}
    state :rejected

    event :approve do
      transitions from: :pending, to: :approved
    end

    event :reject do
      transitions from: :pending, to: :rejected
    end

  end

  def is_group_collection_pin?
    collection.user_group.present?
  end

  def is_user_collection_pin?
    collection.user.present?
  end
end
