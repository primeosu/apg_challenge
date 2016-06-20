class RenameViruses < ActiveRecord::Migration
  def change
    rename_table :viruses, :defects
  end
end
