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

json.all_collections do
  json.array! @collections, partial: 'maps/collection', as: :collection
end

json.user_collections do
  json.array! @user_collections, partial: 'collections/collection', as: :collection
end

json.team_collections do
  json.array! @group_collections, partial: 'collections/team_collection', as: :user_group_collection
end

json.user_groups do
  json.array! @user_groups, partial: 'user_groups/group', as: :user_group
end