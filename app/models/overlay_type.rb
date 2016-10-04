class OverlayType < ActiveRecord::Base
  has_many :overlays
  validates :name, presence: true
end
