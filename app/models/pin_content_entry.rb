class PinContentEntry < ActiveRecord::Base
  belongs_to :pin
  belongs_to :content_entry

  validates :pin, uniqueness: {scipe: :content_entry, message: "A content entry can only be associated with one pin"}
end
