json.id collection.id
json.description collection.description
json.public collection.try(:user_collection).try(:open?)
json.slug collection.name.parameterize
json.owner collection.user_collection && collection.user_collection.restricted? && collection.user_collection.user_id == current_user.try(:id)

if collection.user_collection && collection.user_collection.restricted?
  json.name "#{collection.name}"
  json.details "#{collection.user_collection.user.name} has contributed #{pluralize(collection.pins.count, 'pin', 'pins')} to their collection"
else
  json.name collection.name
  json.details "#{pluralize(collection.users.uniq.count, 'user', 'users')} #{collection.users.uniq.count==1 ? 'has' : 'have'} contributed #{pluralize(collection.pins.count, 'pin', 'pins')} to this collection"
end
