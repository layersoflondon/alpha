class PinContentEntry < ActiveRecord::Base
  belongs_to :pin
  belongs_to :content_entry

  validates_uniqueness_of :pin, scope: :content_entry
end
