class CreateItems < ActiveRecord::Migration[5.0]
  def change
    create_table :items do |t|
      t.string :md5
      t.string :classificationName
      t.string :classificationType
      t.integer :size
      t.string :fileType

      t.timestamps
    end
  end
end
