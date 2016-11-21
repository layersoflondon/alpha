module ContentTypeHelper
  def content_types_for_map
    ContentType.for_pins.inject({}) do |hash, type|
      hash[type.id] = {name: type.name, description: type.description}
      hash
    end
  end
end