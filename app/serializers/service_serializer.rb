class ServiceSerializer < ActiveModel::Serializer
  attributes :id, :name

  has_one :service_type

  root false
end
