require 'csv'

class Defect < ActiveRecord::Base
  def self.import(file)
    CSV.foreach(file.path, headers: true) do |row|
      Defect.create! row.to_hash
    end
  end
end
