json.lat @pins.values.first.try(:first).try(:lat)
json.lng @pins.values.first.try(:first).try(:lng)

json.markers do
  json.array! @pins, partial: 'maps/marker', as: :marker
end

json.places do
  json.array! [] # stub out the places array to avoid Alt dispatcher warning 
end

json.overlays do
  json.array! @overlays, partial: 'maps/overlay', as: :overlay
end
json.collections do
  json.array! @collections, partial: 'collections/collection', as: :collection
end
