class RemoveDataFromPins < ActiveRecord::Migration
  def change
    remove_column :pins, :data, :text
  end
end
