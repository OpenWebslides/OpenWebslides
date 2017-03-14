# frozen_string_literal: true
json.name @deck.name
json.description @deck.description || ''
json.state @deck.state
json.owner do
  json.href api_user_url :id => @deck.owner.id, :only_path => true
end
json.contributors @deck.contributors do |contributor|
  json.href api_user_url :id => contributor.id, :only_path => true
end
