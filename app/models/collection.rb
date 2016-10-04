class Collection < ActiveRecord::Base
  has_many :collection_pins
  has_many :pins, through: :collection_pins

  validates :name, presence: {message: "Please make sure you've included a name for your collection"}

end
