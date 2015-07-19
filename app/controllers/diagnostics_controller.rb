class DiagnosticsController < ApplicationController

  def index
    respond_to do |format|
      format.html { render 'index' }
      format.json { render json: diagnostics_json }
    end
  end

  def create
    @diagnostic = Diagnostic.create(diagnostic_params)
    if @diagnostic.errors.empty?
      render json: @diagnostic
    else
      render nothing: true
    end
  end

  def update
    @diagnostic = Diagnostic.find(params[:id])
    @diagnostic.update(diagnostic_params)
    if @diagnostic.errors.empty?
      render json: @diagnostic
    else
      render nothing: true
    end

  end

  private

  def diagnostics_json
    page = params[:page] || 1
    diagnostics = Diagnostic.order(description: :asc).page(params[:page])
    {
      total_items: Diagnostic.count,
      current_page: page,
      diagnostics: diagnostics
    }
  end

  def diagnostic_params
    params.require(:diagnostic).permit(:id, :description)
  end
end
