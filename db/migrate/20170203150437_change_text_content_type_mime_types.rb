class ChangeTextContentTypeMimeTypes < ActiveRecord::Migration
  def change
    text_type = ContentType.where(name: "text").first
    text_type.update_attribute(:mime_type, "application/*,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain")
  end
end
