class CreatePins < ActiveRecord::Migration
  def change
    create_table :pins do |t|
      t.float :lat
      t.float :lng
      t.string :title
      t.timestamp :date_from
      t.timestamp :date_to
      t.references :user, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
