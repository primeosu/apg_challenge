class ClassificationTypesController < ApplicationController

  def index
    @classification_types = ClassificationType.all
  end

end