class AddDescriptionToContentTypes < ActiveRecord::Migration
  def change
    add_column :content_types, :description, :string
  end
end
