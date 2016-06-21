class ChangeColumnName < ActiveRecord::Migration
  def change
    rename_column :defects, :MD5, :md5
    rename_column :defects, :ClassificationName, :classificationname
    rename_column :defects, :ClassificationType, :classificationtype
    rename_column :defects, :Size, :size
    rename_column :defects, :FileType, :filetype
  end
end
