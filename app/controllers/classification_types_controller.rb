class ClassificationTypesController < ApplicationController

  def index
    @classification_types = ClassificationType.all
  end

  def datatable_ajax
    render json: ClassificationTypeDatatable.new(view_context)
  end

  protected

  class ClassificationTypeDatatable
    delegate :params, to: :@view

    def initialize(view)
      @view = view
    end

    def as_json(options = {})
      {
          data: data,
          recordsTotal: ClassificationType.count,
          recordsFiltered: sort_order_filter.count
      }
    end

    private

    def data
      classification_types = []
      display_on_page.map do |record|
        classification_type = []
        classification_type << record.name
        classification_type << record.malware_count
        classification_types << classification_type
      end
      classification_types
    end

    def sort_order_filter
      records = ClassificationType.order("#{sort_column} #{sort_direction}")
      if params[:search][:value].present?
        records = records.where("name LIKE ?", "%#{params[:search][:value]}%")
      end
      records
    end

    def display_on_page
      sort_order_filter.page(page).per(per_page)
    end

    def page
      params[:start].to_i/per_page + 1
    end

    def per_page
      params[:length].to_i > 0 ? params[:length].to_i : 10
    end

    def sort_column
      columns = %w[lower(name) malware_count]
      columns[params[:order][:'0'][:column].to_i]
    end

    def sort_direction
      params[:order][:'0'][:dir] == "desc" ? "desc" : "asc"
    end
  end

end