class StudentsController < ApplicationController
  before_action :set_student, only: [ :show, :edit, :update, :destroy ]

  def index
    respond_to do |format|
      format.html { render 'index' }
      format.json { render json: students_json }
    end
  end

  def new
    @student = Student.new
    @diagnostics = Diagnostic.order(description: :asc)
  end

  def create
    @student = Student.create(student_params)
    if @student.errors.empty?
      redirect_to @student
    else
      render 'new'
    end
  end

  def show
  end

  def edit
  end

  def update
    @student.update(student_params)
    if @student.errors.empty?
      redirect_to @student
    else
      render 'edit'
    end
  end

  def destroy
    @student.destroy
    redirect_to students_path
  end

  private

  def set_student
    @student = Student.find params[:id]
  end

  def student_params
    params.require(:student).permit([:id, :name, :father, :mother, :cpf, :doc, :birthday, :crm, :doctor, :diagnostic_id])
  end

  def students_json
    page = params[:page] || 1
    students = Student.search(params[:q]).page(params[:page])
    {
      total_items: Student.count,
      current_page: page,
      students: students
    }
  end
end
