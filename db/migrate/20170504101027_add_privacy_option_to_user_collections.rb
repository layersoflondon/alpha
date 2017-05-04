class AddPrivacyOptionToUserCollections < ActiveRecord::Migration
  def change
    add_column :user_collections, :privacy, :integer
  end
end
