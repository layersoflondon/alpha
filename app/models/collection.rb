class Collection < ActiveRecord::Base
  has_many :collection_pins, dependent: :destroy
  has_many :pins, through: :collection_pins

  has_one :user_collection, inverse_of: :collection, dependent: :destroy
  has_one :user, through: :user_collection

  has_one :user_group_collection, inverse_of: :collection, dependent: :destroy
  has_one :user_group, through: :user_group_collection


  validates :name, presence: {message: "Please make sure you've included a name for your collection"}

end
