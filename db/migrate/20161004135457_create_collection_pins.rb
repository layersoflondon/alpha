class CreateCollectionPins < ActiveRecord::Migration
  def change
    create_table :collection_pins do |t|
      t.references :pin, index: true, foreign_key: true
      t.references :collection, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
