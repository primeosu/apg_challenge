class Threat < ActiveRecord::Base
  belongs_to :classification_name, :class_name => ClassificationName, :foreign_key => "classification_name_id"
  belongs_to :classification_type, :class_name => ClassificationType, :foreign_key => "classification_type_id"
  belongs_to :file_type , :class_name => FileType, :foreign_key => "file_type_id"

  def self.import(file)

    CSV.foreach(file.path, headers: true) do |row|
      # skip header row
      if $. == 1
        next
      end

      file_type = FileType.find_or_create_by(name: row["FileType"])
      classification_name = ClassificationName.find_or_create_by(name: row["ClassificationName"])
      classification_type = ClassificationType.find_or_create_by(name: row["ClassificationType"])

      threat = Threat.find_or_create_by(md5: row["MD5"])

      threat.update_attributes( :md5 => row["MD5"],
                     :classification_name => classification_name,
                     :classification_type => classification_type,
                     :size => row["Size"],
                     :file_type => file_type )
    end
  end
end
