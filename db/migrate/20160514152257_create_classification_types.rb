class CreateClassificationTypes < ActiveRecord::Migration
  def change
    create_table :classification_types do |t|
      t.string :name

      t.timestamps

      t.index :name
    end
  end
end
