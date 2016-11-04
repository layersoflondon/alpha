class Pin < ActiveRecord::Base
  include AASM
  belongs_to :user

  has_one :pin_content_entry
  has_one :content_entry, through: :pin_content_entry

  has_many :collection_pins
  has_many :collections, through: :collection_pins

  validates :title, :lat, :lng, :date_from, :user, presence: true

  serialize :data

  attr_accessor :location
  def coords
    {lat: lat, lng: lng}
  end

  aasm do
    state :pending, initial: true
    state :accepted
    state :rejected
    state :flagged

    event :accept do
      transitions from: :pending, to: :accepted
    end

    event :reject do
      transitions from: [:pending, :accepted], to: :rejected
    end

    event :flag do
      transitions from: [:pending, :accepted, :rejected], to: :flagged
    end

  end

end
