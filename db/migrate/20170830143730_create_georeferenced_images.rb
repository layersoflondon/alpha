class CreateGeoreferencedImages < ActiveRecord::Migration
  def change
    create_table :georeferenced_images do |t|
      t.integer :georeferencer_id, index: true, limit: 8
      t.string :georeferencer_ref, index: true
      t.string :wmts_url
      t.string :title
      t.string :creator
      t.string :publisher
      t.string :aasm_state, index: true
      t.string :center
      t.string :north_east
      t.string :south_west
      t.text :metadata


      t.timestamps null: false
    end
  end
end
