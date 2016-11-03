class Overlay < ActiveRecord::Base
  belongs_to :overlay_type

  has_one :overlay_content_entry
  has_one :content_entry, through: :overlay_content_entry

  validates :lat, :lng, :title, :date_from, :date_to, presence: true
end
