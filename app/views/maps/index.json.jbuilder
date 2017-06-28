json.lat 51.544787102505786
json.lng 0.08600234985351562
json.pins do
  json.array! @pins, partial: 'maps/pin', as: :pin
end
json.collections do
  json.array! @collections, partial: 'collections/collection', as: :collection
end
