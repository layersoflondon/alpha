json.lat @collection.pins.try(:first).try(:lat)
json.lng @collection.pins.try(:first).try(:lng)

json.id @collection.id
json.description @collection.description
json.public @collection.try(:user_collection).try(:open?)
json.slug @collection.name.parameterize
json.owner @collection.owner
json.collection_by @collection.user_group.try(:name) || @collection.user.try(:name)

if @collection.user_collection && @collection.user_collection.restricted?
  json.name "#{@collection.name}"
  json.details "#{@collection.user_collection.user.name} has contributed #{pluralize(@collection.pins.count, 'pin', 'pins')} to their collection"
else
  json.name @collection.name
  json.details "#{pluralize(@collection.users.uniq.count, 'user', 'users')} #{@collection.users.uniq.count==1 ? 'has' : 'have'} contributed #{pluralize(@collection.pins.count, 'pin', 'pins')} to this collection"
end

json.markers do
  json.array! @pins, partial: 'maps/marker', as: :marker
end

if @collection.user_collection
  json.team_collection false
elsif @collection.user_group
  json.team_collection true
end