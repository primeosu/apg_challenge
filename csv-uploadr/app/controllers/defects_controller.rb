class DefectsController < ApplicationController

  # GET /defects
  def index
    @defects = Defect.all
  end

  # Upload method for CSV files
  def import
   Defect.import(params[:file])
   redirect_to root_url, notice: "Import Successful"
  end

end
