json.text simple_format(content_entry.content)
json.plain strip_tags(content_entry.content)
json.mime_type "text/plain"
json.text_path "/maps/download/#{content_entry.id}" if content_entry.attached_file.present? 
