class CreateUserGroups < ActiveRecord::Migration
  def change
    create_table :user_groups do |t|
      t.integer :primary_user_id, index: true
      t.string :name
      t.text :description

      t.timestamps null: false
    end
  end
end
