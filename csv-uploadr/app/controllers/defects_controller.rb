class DefectsController < ApplicationController

  def index
    @defects = Defect.all
  end

  def upload
   Defect.upload(params[:file])
   redirect_to defects_path, notice: "Upload Successful"
  end

end
