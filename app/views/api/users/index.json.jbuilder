# frozen_string_literal: true
json.users @users do |user|
  json.href api_user_url :id => user.id, :only_path => true
  json.name user.name
end
