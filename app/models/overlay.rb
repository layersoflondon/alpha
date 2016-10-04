class Overlay < ActiveRecord::Base
  belongs_to :overlay_type
  belongs_to :overlay_content_entry
end
