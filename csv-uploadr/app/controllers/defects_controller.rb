class DefectsController < ApplicationController

  # GET /defects
  def index
    @defects = Defect.all
  end

  # Upload method for CSV files
  def upload
   Defect.upload(params[:file])
   redirect_to defects_path, notice: "Upload Successful"
  end

end
