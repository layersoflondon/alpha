json.text content_entry.content
json.mime_type "text/html"
json.text_content open(content_entry.attached_file.path).read
json.text_path content_entry.attached_file.url
