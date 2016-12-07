class AddFileNameToContentEntries < ActiveRecord::Migration
  def change
    add_column :content_entries, :file_name, :string
  end
end
