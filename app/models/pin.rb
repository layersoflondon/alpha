class Pin < ActiveRecord::Base
  belongs_to :content_type
  belongs_to :content
end
