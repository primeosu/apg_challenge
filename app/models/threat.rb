class Threat < ActiveRecord::Base
  belongs_to :classification, :class_name => Classification, :foreign_key => "classification_id"
  belongs_to :file_type , :class_name => FileType, :foreign_key => "file_type_id"

  # chart
  delegate :category, to: :classification, prefix: true

  def self.import(file)

    CSV.foreach(file.path, headers: true) do |row|
      # skip header row
      if $. == 1
        next
      end

      classification = Classification.find_or_create_by(name: row["ClassificationName"])
      classification.update_attributes(category: row["ClassificationType"])      

      file_type = FileType.find_or_create_by(name: row["FileType"])

      threat = Threat.find_or_create_by(md5: row["MD5"])

      threat.update_attributes( :md5 => row["MD5"],
                     :classification => classification,
                     :size => row["Size"],
                     :file_type => file_type )
    end
  end
end
