class Overlay < ActiveRecord::Base
  belongs_to :overlay_type
  belongs_to :overlay_content_entry

  validates :lat, :lng, :title, :date_from, :date_to, presence: true
end
