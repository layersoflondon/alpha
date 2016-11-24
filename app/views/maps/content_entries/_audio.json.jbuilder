json.mime_type content_entry.attached_file.content_type
# transparent pixel to avoid getting a black box background on audio files
json.poster "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEX/TQBcNTh/AAAAAXRSTlMAQObYZgAAAApJREFUeJxjYgAAAAYAAzY3fKgAAAAASUVORK5CYII="
json.audio_path "#{content_entry.attached_file.url}?audio=true"
