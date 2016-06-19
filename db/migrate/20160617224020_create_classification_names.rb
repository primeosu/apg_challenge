class CreateClassificationNames < ActiveRecord::Migration
  def change
    create_table :classification_names do |t|
      t.string :name

      t.timestamps null: false
    end
  end
end
