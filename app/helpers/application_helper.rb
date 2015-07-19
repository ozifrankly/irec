module ApplicationHelper
  def diagnostics_select
    result = {}
    Diagnostic.order(description: :asc).each{|d| result.merge!({d.description => d.id})}
    result
  end
end
