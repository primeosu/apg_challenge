module Importable

  def import_from_csv(csv_file)
    options = {chunk_size: 100}
    SmarterCSV.process(csv_file, options) do |chunk|
      chunk.each do |row|
        yield row
      end
    end
  end

end