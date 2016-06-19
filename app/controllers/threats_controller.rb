class ThreatsController < ApplicationController
  def index
    @threats = Threat.all
    @threat_classification_type_counts = count_threats_by_classification_type
    @threat_classification_name_counts = count_threats_by_classification_name
    @threat_file_type_counts = count_threats_by_file_type
  end

  def import
    respond_to do |format|
      begin
        @threat = Threat.import(threat_params)
        format.html { redirect_to threats_path, notice: "Malware data has been imported." }
        format.json { render json: @threat, status: :created, location: @threat }
  
      rescue StandardError => e
        format.html { redirect_to threats_path, notice: e.message }
        format.json { render json: e.message, status: :unproccessable_entity }
      end
    end
  end

  private

  def threat_params
    params.require(:file)
  end

  def count_threats_by_classification_type
    types=[]
    Threat.all.map { |t| types.push(t.classification.category) }
    types.inject(Hash.new(0)) { |total, e| total[e] += 1 ;total}
  end

  def count_threats_by_classification_name
    names=[]
    Threat.all.map { |t| names.push(t.classification.name) }
    names.inject(Hash.new(0)) { |total, e| total[e] += 1 ;total}
  end

  def count_threats_by_file_type
    types=[]
    Threat.all.map { |t| types.push(t.file_type.name) }
    types.inject(Hash.new(0)) { |total, e| total[e] += 1 ;total}
  end
end
