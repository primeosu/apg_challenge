class CreateFileTypes < ActiveRecord::Migration
  def change
    create_table :file_types do |t|
      t.string :name

      t.timestamps

      t.index :name
    end
  end
end
