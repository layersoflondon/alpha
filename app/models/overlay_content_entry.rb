class OverlayContentEntry < ActiveRecord::Base
  belongs_to :overlay
  belongs_to :content_entry

  validates_uniqueness_of :overlay, scope: :content_entry
end
