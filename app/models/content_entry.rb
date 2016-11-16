class ContentEntry < ActiveRecord::Base
  belongs_to :content_type

  has_one :pin_content_entry
  has_one :pin, through: :pin_content_entry

  has_one :overlay_content_entry
  has_one :overlay, through: :overlay_content_entry

  validates_with AnyPresenceValidator, fields: [:attached_file, :url, :content, :data, :tileserver_url]
  validates :content_type, presence: true

  attachment :attached_file
end
