class Pin < ActiveRecord::Base
  has_one :pin_content_entry
  has_one :content_entry, through: :pin_content_entry

  has_many :collection_pins
  has_many :collections, through: :collection_pins

  validates :title, :lat, :lng, :date_from, presence: true

end
