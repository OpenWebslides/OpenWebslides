# frozen_string_literal: true

class RepoService
  attr_accessor :deck

  def initialize(deck)
    @deck = deck
  end

  def create_repository; end

  def destroy_repository; end

  def fetch_content; end

  def update_content(params); end
end
