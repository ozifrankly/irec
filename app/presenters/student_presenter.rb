class StudentPresenter < SimpleDelegator
  attr_reader :student

  def initializer(student)
    @student = student
    __setobj__(student)
  end
end
