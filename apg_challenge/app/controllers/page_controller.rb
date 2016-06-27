require 'csv'

class PageController < ApplicationController
  def index
  end

  def clear
    Malware.delete_all
    ClassificationName.delete_all
    ClassificationType.delete_all
    FileType.delete_all
    flash[:info] = "You've successfully cleared the database"
    redirect_to page_index_path
  end

  def upload
    uploaded_io = params[:csvFile]
    #check if they left the upload file blank
    if params[:csvFile].blank?
      flash[:error] = 'You must select a file to upload.'
      redirect_to page_index_path
    #check if they uploaded a different kind of file
    elsif uploaded_io.content_type != "text/csv"
      flash[:error] = 'Only CSV files'
      redirect_to page_index_path
    elsif true
      #save the file
      File.open(Rails.root.join('public', 'uploads', uploaded_io.original_filename), 'wb') do |file|
        file.write(uploaded_io.read)
      end

      #read and parse the file
      csv_text = File.read(Rails.root.join('public', 'uploads', uploaded_io.original_filename))
      csv = CSV.parse(csv_text, :headers => true)
      index = 0;
      csv.each do |row|
        begin
          attributes = {:md5 => row["MD5"],
            :className => row["ClassificationName"],
            :classType => row["ClassificationType"],
            :size => row["Size"],
            :fileType => row["FileType"]}
            index += 1
          createMalware attributes
        rescue => e #in the event it errors out, we'll at least capture that.
          Rails.logger.error { "Encountered an error when trying to save a record. #{e.message} #{e.backtrace.join("\n")}" }
          nil
        end
      end

      flash[:info] = "You've successfully inserted " + index.to_s + " rows into the database!"
      redirect_to page_results_path
    end
  end


  def results
    @types = Hash.new
    type = ClassificationType.all
    type.each { |t|
      m = Malware.where(classification_type_id: t.id).to_a.count
      @types.store t.name, m
    }
  end

  #Created this method in the event we need to add addtional processing
  #so we can continue to have a central processing method for Malware entries
  def createMalware attributes
    md5 = attributes[:md5]
    className = attributes[:className]
    classType = attributes[:classType]
    size = attributes[:size]
    fileType = attributes[:fileType]

    cName = ClassificationName.find_by name: className
    if cName.nil?
      cName = ClassificationName.new name: className
      cName.save
    end

    cType = ClassificationType.find_by name: classType
    if cType.nil?
      cType = ClassificationType.new name: classType
      cType.save
    end

    fType = FileType.find_by name: fileType
    if fType.nil?
      fType = FileType.new name: fileType
      fType.save
    end

    m = Malware.new md5: md5, classification_name_id: cName.id, classification_type_id: cType.id, size: size, file_type_id: fType.id
    m.save
  end
end
