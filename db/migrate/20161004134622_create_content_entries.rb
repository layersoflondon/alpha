class CreateContentEntries < ActiveRecord::Migration
  def change
    create_table :content_entries do |t|
      t.references :content_type, index: true, foreign_key: true
      t.string :attached_file_id #string field for refile to add its stuff if a file is uploaded
      t.string :attached_file_filename #filename for the attached file if any
      t.integer :attached_file_size #file size for the attached file if any
      t.string :attached_file_content_type #content type for the attached file if any
      t.text :url # the video or other URL to access the content
      t.text :content # description of the content
      t.text :attribution #the field where users attribute the source for licencing etc.
      t.text :data #data blob for things like geojson


      t.timestamps null: false
    end
  end
end
