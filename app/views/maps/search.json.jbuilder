json.lat @pins.values.first.first.lat
json.lng @pins.values.first.first.lng

json.markers do
  json.array! @pins, partial: 'maps/marker', as: :marker
end
json.overlays do
  json.array! @overlays, partial: 'maps/overlay', as: :overlay
end
json.collections do
  json.array! @collections, partial: 'maps/collection', as: :collection
end
