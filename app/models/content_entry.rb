class ContentEntry < ActiveRecord::Base
  belongs_to :content_type
  accepts_nested_attributes_for :content_type

  has_one :pin_content_entry, inverse_of: :content_entry
  has_one :pin, through: :pin_content_entry

  has_one :overlay_content_entry
  has_one :overlay, through: :overlay_content_entry

  validates_with AnyPresenceValidator, fields: [:attached_file, :video_url, :content, :tileserver_url, :data]
  validates :content_type, presence: true

  serialize :metadata, JSON

  mount_base64_uploader :attached_file, AttachedFileUploader

  def base64_attachment
    raise "Invalid content type" unless attached_file && content_type.name=="text"

    Base64.encode64(open(attached_file.path).read)
  end
end
