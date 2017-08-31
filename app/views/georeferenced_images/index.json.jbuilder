json.array! @georeferenced_images, partial: 'georeferenced_images/georeferenced_image', as: :image
# keys = ["georeferencer_id", "center", "south_west", "north_east"]
# values = @georeferenced_images.collect do |image|
#   keys.collect {|k| image.send(k.to_sym)}
# end
# json.columns do
#     json.array! keys
# end
#
# json.rows do
#   json.array! values
# end