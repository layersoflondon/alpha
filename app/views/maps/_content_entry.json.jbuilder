json.id content_entry.id
json.title content_entry.content
json.resource do
  json.type content_entry.content_type.name.parameterize
  json.partial! "maps/content_entry_#{content_entry.content_type.name.parameterize}", locals: {content_entry: content_entry}
end
