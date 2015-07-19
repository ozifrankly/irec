class ServiceTypesController < ApplicationController

  def index
    respond_to do |format|
      format.html { render 'index' }
      format.json { render json: service_types_json }
    end
  end

  def create
    @service_type = ServiceType.create(service_type_params)
    if @service_type.errors.empty?
      render json: @service_type
    else
      render nothing: true
    end
  end

  def update
    @service_type = ServiceType.find(params[:id])
    @service_type.update(service_type_params)
    if @service_type.errors.empty?
      render json: @service_type
    else
      render nothing: true
    end

  end

  private

  def service_types_json
    page = params[:page] || 1
    service_types = ServiceType.order(name: :asc).page(params[:page])
    {
      total_items: ServiceType.count,
      current_page: page,
      service_types: service_types
    }
  end

  def service_type_params
    params.require(:service_type).permit(:id, :name)
  end

end
