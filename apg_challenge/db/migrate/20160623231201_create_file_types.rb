class CreateFileTypes < ActiveRecord::Migration
  def change
    create_table :file_types do |t|
      t.string :name

      t.timestamps null: false
    end
  end
end
