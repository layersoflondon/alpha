class Pin < ActiveRecord::Base
  include AASM
  belongs_to :user

  has_one :pin_content_entry, inverse_of: :pin
  has_one :content_entry, through: :pin_content_entry
  accepts_nested_attributes_for :pin_content_entry

  has_many :collection_pins
  has_many :collections, through: :collection_pins

  validates :title, :lat, :lng, :date_from, :user, presence: true

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

  after_initialize do
    # if self.content_type.is_a?(String)
    #   self.content_type = ContentType.find(name: self.content_type)
    # end
    #
    # if self.from_date.is_a?(String)
    #   self.from_date = DateTime.parse(self.from_date)
    # end
    #
    # if self.to_date.is_a?(String)
    #   self.to_date = DateTime.parse(self.to_date)
    # end

  end

end
