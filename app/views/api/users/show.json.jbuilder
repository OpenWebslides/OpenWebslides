# frozen_string_literal: true
json.data do
  json.id @user.id.to_s
  json.type 'user'
  json.attributes do
    json.name @user.name
    json.email @user.email
  end

  json.relationships do
  end
end

json.links do
  json.self api_user_url :id => @user.id
end
