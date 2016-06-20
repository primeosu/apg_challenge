class DefectsController < ApplicationController

  def index
    @defects = Defect.all
  end

end
