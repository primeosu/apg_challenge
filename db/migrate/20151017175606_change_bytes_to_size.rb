class ChangeBytesToSize < ActiveRecord::Migration
  def change
    rename_column :malware_files, :bytes, :size
  end
end
