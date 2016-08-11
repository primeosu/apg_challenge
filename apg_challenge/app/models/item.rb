class Item < ApplicationRecord
  require 'csv'

  def self.import(file)
    CSV.foreach(file.path, :headers => true) do |row|
      items_hash = row.to_hash
      Item.create!(
          md5: items_hash['MD5'],
          classificationName: items_hash['ClassificationName'],
          classificationType: items_hash['ClassificationType'],
          size: items_hash['Size'],
          fileType: items_hash['FileType'])
    end
  end
end
