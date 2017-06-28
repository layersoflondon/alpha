json.id user_group_collection.collection.id
json.description user_group_collection.collection.description
json.public user_group_collection.collection.availability
json.slug user_group_collection.collection.name.parameterize
json.owner user_group_collection.collection.owner
json.collection_by user_group_collection.collection.user_group.try(:name) || user_group_collection.collection.user.try(:name)

if user_group_collection.collection.user_collection && user_group_collection.collection.user_user_group_collection.collection.restricted?
  json.name "#{user_group_collection.collection.name}"
  json.details "#{user_group_collection.collection.user_user_group_collection.collection.user.name} has contributed #{pluralize(user_group_collection.collection.pins.count, 'pin', 'pins')} to their collection"
else
  json.name user_group_collection.collection.name
  json.details "#{pluralize(user_group_collection.collection.users.uniq.count, 'user', 'users')} #{user_group_collection.collection.users.uniq.count==1 ? 'has' : 'have'} contributed #{pluralize(user_group_collection.collection.pins.count, 'pin', 'pins')} to this collection"
end
