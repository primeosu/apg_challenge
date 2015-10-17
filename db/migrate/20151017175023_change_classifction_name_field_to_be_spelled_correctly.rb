class ChangeClassifctionNameFieldToBeSpelledCorrectly < ActiveRecord::Migration
  def change
    rename_column :malware_files, :classifcation_name, :classification_name
  end
end
