class Student < ActiveRecord::Base
  has_many :student_histories, dependent: :destroy
  belongs_to :diagnostic
  has_and_belongs_to_many :courses
end
