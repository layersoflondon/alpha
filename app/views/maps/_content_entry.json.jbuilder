json.id content_entry.id
json.pin_content_entry_id content_entry.try(:pin_content_entry).try(:id)

json.title content_entry.pin.title
json.url content_entry.pin.link_url if content_entry.pin.link_url.present?

json.resource do
  json.type content_entry.content_type.name.parameterize("_")
  json.mime_type (content_entry.attached_file.content_type || content_entry.content_type.name)
  json.file_name (content_entry.file_name || "")

  json.content_type_id content_entry.content_type.id
  json.partial! "maps/content_entries/#{content_entry.content_type.name.parameterize("_")}", locals: {content_entry: content_entry}
end
