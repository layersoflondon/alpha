json.position marker.first
json.pins do
  json.array! marker.last, partial: 'maps/pin', as: :pin
end
