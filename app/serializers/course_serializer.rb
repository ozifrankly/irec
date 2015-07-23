class CourseSerializer < ActiveModel::Serializer
  attributes :id, :name

  has_one :service

  root false
end
