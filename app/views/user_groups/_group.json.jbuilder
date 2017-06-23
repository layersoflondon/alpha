json.id user_group.id
json.name user_group.name
json.description user_group.description

json.group_collections do
  json.array! user_group.collections, partial: 'collections/collection', as: :collection
end