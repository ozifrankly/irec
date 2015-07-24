class CoursesController < ApplicationController

  def index
    respond_to do |format|
      format.html { render 'index' }
      format.json { render json: courses_json }
    end
  end

  def create
    @course = Course.create(course_params)
    if @course.errors.empty?
      render json: @course
    else
      render nothing: true
    end
  end

  def show
    @course = Course.find(params[:id])
  end

  def update
    @course = Course.find(params[:id])
    @course.update(course_params)
    if @course.errors.empty?
      render json: @course
    else
      render nothing: true
    end

  end

  def add_student
    @course = Course.find(params[:id])
    @student = Student.find(params[:student_id])
    if @student && !@course.students.include?(@student)
      @course.students << @student
      render json: @student
    else
      render nothing: true, status: :not_found
    end
  end

  def remove_student
    @course = Course.find(params[:id])
    @student = Student.find(params[:student_id])
    if @student
      @course.students.delete @student
      render json: @student
    else
      render nothing: true, status: :not_found
    end
  end

  def students
    @course = Course.find(params[:id])
    @students = @course.students 
    render json: @students.to_json
  end

  private

  def courses_json
    page = params[:page] || 1
    courses = Course.order(created_at: :desc).page(params[:page])
    {
      total_items: Course.count,
      current_page: page,
      courses: courses.all.map { |c| CourseSerializer.new(c) }
    }
  end

  def course_params
    params.require(:course).permit(:id, :name, :service_id)
  end


end
