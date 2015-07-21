class ServicesController < ApplicationController

  def index
    respond_to do |format|
      format.html { render 'index' }
      format.json { render json: services_json }
    end
  end

  def create
    @service = Service.create(service_params)
    if @service.errors.empty?
      render json: @service
    else
      render nothing: true
    end
  end

  def update
    @service = Service.find(params[:id])
    @service.update(service_params)
    if @service.errors.empty?
      render json: @service
    else
      render nothing: true
    end

  end

  private

  def default_serializer_options
      {root: false}
  end

  def services_json
    page = params[:page] || 1
    services = Service.joins(:service_type).order(name: :asc).page(params[:page])
    {
      total_items: Service.count,
      current_page: page,
      services: services.all.map { |s| ServiceSerializer.new(s) }
    }
  end

  def service_params
    params.require(:service).permit(:id, :name, :service_type_id)
  end
end
