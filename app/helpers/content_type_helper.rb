module ContentTypeHelper
  def content_types_for_map
    ContentType.for_pins.inject({}) do |hash, type|
      hash[type.id] = type.name
      hash
    end
  end
end