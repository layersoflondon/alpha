class CollectionPin < ActiveRecord::Base
  belongs_to :pin
  belongs_to :collection
end
