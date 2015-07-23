class Service < ActiveRecord::Base
  belongs_to :service_type
  has_many :courses
end
