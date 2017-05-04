class Collection < ActiveRecord::Base
  has_many :collection_pins, dependent: :destroy, inverse_of: :collection
  has_many :pins, through: :collection_pins, inverse_of: :collection, dependent: :nullify
  has_many :users, through: :pins

  has_one :user_collection, inverse_of: :collection, dependent: :destroy
  has_one :user, through: :user_collection

  accepts_nested_attributes_for :user_collection

  has_one :user_group_collection, inverse_of: :collection, dependent: :destroy
  has_one :user_group, through: :user_group_collection

  validates :name, presence: {message: "Please make sure you've included a name for your collection"}

end
