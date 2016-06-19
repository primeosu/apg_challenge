class CreateClassificationTypes < ActiveRecord::Migration
  def change
    create_table :classification_types do |t|
      t.string :name

      t.timestamps null: false
    end
  end
end
