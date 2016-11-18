class ChangeUrlColumnOnContentEntries < ActiveRecord::Migration
  def change
    rename_column :content_entries, :url, :video_url
  end
end
