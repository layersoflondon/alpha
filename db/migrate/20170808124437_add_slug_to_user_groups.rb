class AddSlugToUserGroups < ActiveRecord::Migration
  def change
    add_column :user_groups, :slug, :string, unique: true
  end
end
