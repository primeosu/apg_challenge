class CreateFiletypes < ActiveRecord::Migration
  def change
    create_table :filetypes do |t|
      t.string :extension, default: 'unknown', null: false

      t.timestamps
    end
  end
end
