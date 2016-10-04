class ContentType < ActiveRecord::Base
  has_many :content_entries

  validates_presence_of :name
  validates_uniqueness_of :name

end
