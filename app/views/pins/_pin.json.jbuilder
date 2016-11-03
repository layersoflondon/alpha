json.id @pin.id
json.title @pin.title
json.location "Dagenham"
json.position {lat: @pin.lat, lng: @pin.lng}
json.content_entries @pin.pin_data
