# frozen_string_literal: true

class RepoService
  attr_accessor :deck

  def initialize(deck)
    @deck = deck
  end

  def create_repository
    CreateRepoCommand.new(@deck).execute
  end

  def destroy_repository
    DestroyRepoCommand.new(@deck).execute
  end

  def fetch_content
    command = FetchRepoCommand.new @deck

    command.execute
  end

  def update_content(params)
    command = UpdateRepoCommand.new @deck

    command.content = params[:content]
    command.author = params[:author]

    command.execute
  end
end
