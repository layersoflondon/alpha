class GeoreferencedImage < ActiveRecord::Base
  include AASM
  serialize :metadata, JSON

  validates :wmts_url, presence: true
  validates :georeferencer_id, presence: true, uniqueness: true
  validates :georeferencer_ref, presence: true, uniqueness: true

  aasm do
    state :pending, initial: true
    state :published
    state :flagged

    event :publish do
      transitions from: :pending, to: :published
    end

    event :flag do
      transitions from: :published, to: :flagged
    end
  end

  after_initialize do
    self.metadata ||= {}
  end
  before_validation :parse_wmts, on: :create

  private
  def parse_wmts
    begin
      doc = Nokogiri::XML(open(wmts_url))
      doc.remove_namespaces!
      tile_url = doc.css('Contents Layer ResourceURL').attr('template').value
      sw = doc.css('WGS84BoundingBox LowerCorner').text.split(" ").reverse
      ne = doc.css('WGS84BoundingBox UpperCorner').text.split(" ").reverse
      self.metadata[:tile_url] = tile_url
      self.georeferencer_id = tile_url.split("/")[4]
      self.north_east = ne.join(",")
      self.south_west = sw.join(",")
      self.aasm_state = :published
    rescue => e
      self.errors.add :base, "Couldn't parse WMTS info: #{e}"
    end


  end
  
end
