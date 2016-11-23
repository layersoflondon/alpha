class RemoveAttachmentFieldsFromContentEntry < ActiveRecord::Migration
  def change
    remove_column :content_entries, :attached_file_filename
    remove_column :content_entries, :attached_file_size
    remove_column :content_entries, :attached_file_content_type
    remove_column :content_entries, :attached_file_id
  end
end
