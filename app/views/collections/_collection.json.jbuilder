json.id collection.id
json.name collection.name
json.description collection.description
json.details "#{pluralize(collection.users.uniq.count, 'user', 'users')} #{collection.users.uniq.count==1 ? 'has' : 'have'} contributed #{pluralize(collection.pins.count, 'pin', 'pins')} to this collection"