class CreatePinContentEntries < ActiveRecord::Migration
  def change
    create_table :pin_content_entries do |t|
      t.references :pin, index: true, foreign_key: true
      t.references :content_entry, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
