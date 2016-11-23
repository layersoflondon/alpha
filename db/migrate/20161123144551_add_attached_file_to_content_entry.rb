class AddAttachedFileToContentEntry < ActiveRecord::Migration
  def change
    add_column :content_entries, :attached_file, :string
  end
end
