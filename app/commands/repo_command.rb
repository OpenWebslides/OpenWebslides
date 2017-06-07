# frozen_string_literal: true

class RepoCommand
  attr_accessor :deck

  def initialize(deck)
    @deck = deck
  end

  ##
  # Execute action
  #
  def execute; end

  protected

  def repo
    @repo ||= OpenWebslides::Repository.new @deck
  end

  def content_file
    File.join OpenWebslides::Configuration.repository_path, @deck.canonical_name, 'index.html'
  end

  def template_path
    Rails.root.join 'lib', 'assets', 'templates', @deck.template
  end
end
