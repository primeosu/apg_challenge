class WelcomeController < ApplicationController
  def index
  end

  def list
   @malwares = Malware.all
  end

  def upload
    file = params[:file]
    file_extension = File.extname(file.path)
    if(file_extension.eql?(".csv"))
    	Malware.upload(file)
    	logger.debug "Now redirecting"
    	flash[:notice] = "Information Successfully Added!"
    	redirect_to welcome_list_path
    else
      flash[:danger] = "Not a CSV File! Please Try again!"
      redirect_to welcome_index_path
    end
  end

end