class AddMetadataToContentEntries < ActiveRecord::Migration
  def change
    add_column :content_entries, :metadata, :text
  end
end
