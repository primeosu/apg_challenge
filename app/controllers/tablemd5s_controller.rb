class Tablemd5sController < ApplicationController
  def index
    
    # Have access to all columns in the table for all MD5s.
    @tabledata = Tablemd5.all
    
    # Take the classified_data give it the corresponding value:
    # Take the table data and group it by the ClassificationType values.
    @classified_data = @tabledata.group_by{|row| row["ClassificationType"]}.values
  end

  def import
    # Import data, redirect to root page, show a message.
    Tablemd5.import(params[:file])
    redirect_to root_url, notice: "Data Imported. View Updated Table."
  end
end
