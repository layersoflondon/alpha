json.id content_entry.id
json.title content_entry.pin.title

json.resource do
  json.type content_entry.content_type.name.parameterize("_")
  json.mime_type (content_entry.attached_file.content_type || content_entry.content_type.name)
  json.partial! "maps/content_entries/#{content_entry.content_type.name.parameterize("_")}", locals: {content_entry: content_entry}
end
