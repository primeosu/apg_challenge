class Tablemd5 < ActiveRecord::Base
  
  # http://ruby-doc.org/stdlib-1.9.3/libdoc/csv/rdoc/CSV.html
  require 'csv'
  
  # Creating a function to import the CSV data. Takes in a file
  # argument.
  def self.import(file)
    
    # Loop through the CSV data
    CSV.foreach(file.path, headers:true) do |row|
      
      # and then for each row, store the MD5's information.
      Tablemd5.create! row.to_hash
    end
  end
end
