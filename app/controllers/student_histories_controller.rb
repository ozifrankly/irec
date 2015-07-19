class StudentHistoriesController < ApplicationController

  def index
    respond_to do |format|
      format.html { render 'index' }
      format.json { render json: student_histories_json }
    end
  end

  def create
    @student = Student.find(params[:student_id])
    @history = StudentHistory.new(student_histories_params.merge!(student_id: @student.id))
    if @history.save
      render json: @history
    else
      render nothing: true
    end
  end

  private

  def student_histories_params
    params.require(:student_history).permit(:id, :title, :description, :student_id)
  end

  def student_histories_json
    page = params[:page] || 1
    histories = StudentHistory.where(student_id: params[:student_id]).order(created_at: :desc).page(params[:page])
    {
      student_id: params[:student_id],
      total_items: StudentHistory.where(student_id: params[:student_id]).count,
      current_page: page,
      student_histories: histories
    }
  end
end

