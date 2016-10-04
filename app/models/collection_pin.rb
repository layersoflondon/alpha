class CollectionPin < ActiveRecord::Base
  belongs_to :pin
  belongs_to :collection

  validates :pin, :collection, presence: true
end
