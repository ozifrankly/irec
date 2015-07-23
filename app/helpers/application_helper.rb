module ApplicationHelper
  def diagnostics_select
    result = {}
    Diagnostic.order(description: :asc).each{|d| result.merge!({d.description => d.id})}
    result
  end

  def service_types_select
    result = {}
    ServiceType.order(name: :asc).each{|d| result.merge!({d.name => d.id})}
    result
  end

  def service_select
    result = {}
    Service.order(name: :asc).each{|d| result.merge!({d.name => d.id})}
    result
  end
end
