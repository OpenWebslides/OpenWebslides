# frozen_string_literal: true
json.decks @decks do |deck|
  json.href api_user_deck_url :id => deck.id, :user_id => deck.owner.id, :only_path => true
  json.name deck.name
end
