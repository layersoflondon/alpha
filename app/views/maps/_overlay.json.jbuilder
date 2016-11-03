# {
#    "id":3,
#    "name":"Barking FC - Football ",
#    "date_range":"2000 - 2016",
#    "url":"https://spen666.files.wordpress.com/2013/02/20130227-barking-fc-v-afc-wimbledon-035.jpg",
#    "bounds":[
#       [
#          51.544787102505786,
#          0.0900234985351562
#       ],
#       [
#          51.52478710250578,
#          0.14000234985351562
#       ]
#    ]
# },

json.id overlay.id
json.title overlay.title
json.position do
  json.lat overlay.lat
  json.lng overlay.lng
end
json.resource do
  json.type overlay.overlay_type.name.parameterize("_")
  json.partial! "maps/overlays/#{overlay.overlay_type.name.parameterize("_")}", locals: {overlay_data: overlay.content_entry}
end
