class AddUrlToPin < ActiveRecord::Migration
  def change
    add_column :pins, :link_url, :string
  end
end
