class CreateOverlayTypes < ActiveRecord::Migration
  def change
    create_table :overlay_types do |t|
      t.string :name

      t.timestamps null: false
    end
  end
end
