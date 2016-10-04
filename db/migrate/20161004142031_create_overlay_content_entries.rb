class CreateOverlayContentEntries < ActiveRecord::Migration
  def change
    create_table :overlay_content_entries do |t|
      t.references :overlay, index: true, foreign_key: true
      t.references :content_entry, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
