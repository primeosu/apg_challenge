class CreateThreats < ActiveRecord::Migration
  def change
    create_table :threats do |t|
      t.string :md5
      t.integer :size
      t.integer :classification_name_id
      t.integer :classification_type_id
      t.integer :file_type_id

      t.timestamps null: false
    end
  end
end
