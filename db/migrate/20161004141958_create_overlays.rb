class CreateOverlays < ActiveRecord::Migration
  def change
    create_table :overlays do |t|
      t.string :title
      t.float :lat
      t.float :lng
      t.timestamp :date_from
      t.timestamp :date_to

      t.text :description

      t.timestamps null: false
    end
  end
end
