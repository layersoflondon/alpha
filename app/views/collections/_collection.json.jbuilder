json.id collection.id
json.description collection.description
json.public collection.availability
json.slug collection.name.parameterize
json.owner collection.owner
json.collection_by collection.user_group.try(:name) || collection.user.try(:name)

if collection.user_collection && collection.user_collection.restricted?
  json.name "#{collection.name}"
  json.details "#{collection.user_collection.user.name} has contributed #{pluralize(collection.pins.count, 'pin', 'pins')} to their collection"
else
  json.name collection.name
  json.details "#{pluralize(collection.users.uniq.count, 'user', 'users')} #{collection.users.uniq.count==1 ? 'has' : 'have'} contributed #{pluralize(collection.pins.count, 'pin', 'pins')} to this collection"
end
