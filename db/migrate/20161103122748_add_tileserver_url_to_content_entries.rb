class AddTileserverUrlToContentEntries < ActiveRecord::Migration
  def change
    add_column :content_entries, :tileserver_url, :string
  end
end
