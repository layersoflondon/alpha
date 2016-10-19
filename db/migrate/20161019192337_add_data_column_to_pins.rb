class AddDataColumnToPins < ActiveRecord::Migration
  def change
    add_column :pins, :data, :text
  end
end
