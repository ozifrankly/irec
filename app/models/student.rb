class Student < ActiveRecord::Base
  has_many :student_histories, dependent: :destroy
  belongs_to :diagnostic
end
