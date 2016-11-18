class DropOverlayTypes < ActiveRecord::Migration
  def change
    drop_table :overlay_types
  end
end
