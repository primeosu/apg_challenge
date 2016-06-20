class VirusesController < ApplicationController

  def index
    @viruses = Virus.all
  end

end
