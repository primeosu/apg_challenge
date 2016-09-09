class CreateClassifications < ActiveRecord::Migration
  def change
    create_table :classifications do |t|
      t.string :threat_type, default: 'unknown', null: false
      t.string :behavior, default: 'unknown', null: false

      t.timestamps
    end
  end
end
