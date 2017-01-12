class ModerationMailer < ApplicationMailer
  def content_entry_flagged(content_entry)
    @content_entry = content_entry
    mail(subject: "Content entry flagged")
  end

  def georeferenced_overlay_flagged(georeferenced_overlay)
    @georeferenced_overlay = georeferenced_overlay
    mail(subject: "Georeferenced overlay image flagged")
  end
end
