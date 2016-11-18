class AddSuitabilityToContentTypes < ActiveRecord::Migration
  def change
    add_column :content_types, :suitability, :int
  end
end
