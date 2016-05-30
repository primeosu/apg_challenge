class CreateTablemd5s < ActiveRecord::Migration
  def change
    create_table :tablemd5s do |t|
      t.string :MD5
      t.string :ClassificationName
      t.string :ClassificationType
      t.integer :Size
      t.string :FileType

      t.timestamps null: false
    end
  end
end
