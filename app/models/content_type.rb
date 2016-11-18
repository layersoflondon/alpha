class ContentType < ActiveRecord::Base
  enum suitability: [:for_pins, :for_overlays, :for_both]

  has_many :content_entries

  validates_presence_of :name
  validates_uniqueness_of :name

end
