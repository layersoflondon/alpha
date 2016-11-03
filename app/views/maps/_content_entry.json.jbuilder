json.id content_entry.id
json.title content_entry.content
json.resource do
  json.type content_entry.content_type.name.parameterize("_")
  json.partial! "maps/content_entries/#{content_entry.content_type.name.parameterize("_")}", locals: {content_entry: content_entry}
end
