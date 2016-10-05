class AddAssmStateToPins < ActiveRecord::Migration
  def change
    add_column :pins, :aasm_state, :string
  end
end
