class AddAasmStateToCollectionPins < ActiveRecord::Migration
  def change
    add_column :collection_pins, :aasm_state, :string
  end
end
