class CreateUserGroupCollections < ActiveRecord::Migration
  def change
    create_table :user_group_collections do |t|
      t.references :user_group, index: true, foreign_key: true
      t.references :collection, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
