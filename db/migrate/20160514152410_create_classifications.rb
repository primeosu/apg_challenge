class CreateClassifications < ActiveRecord::Migration
  def change
    create_table :classifications do |t|
      t.string :name
      t.integer :classification_type_id

      t.timestamps

      t.index :name
      t.index :classification_type_id
    end
  end
end
