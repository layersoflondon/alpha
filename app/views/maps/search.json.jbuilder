json.lat @pins.first.lat
json.lng @pins.first.lng

json.pins do
  json.array! @pins, partial: 'maps/pin', as: :pin
end
json.collections do
  json.array! @collections, partial: 'maps/collection', as: :collection
end
