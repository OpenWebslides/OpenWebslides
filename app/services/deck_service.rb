# frozen_string_literal: true

class DeckService < ApplicationService
  attr_accessor :deck

  def initialize(deck)
    @deck = deck
  end

  def create
    if @deck.save
      Repository::Create.new(@deck).execute
      Notification.create :user => @deck.owner,
                          :deck => @deck,
                          :event_type => :deck_created

      true
    else
      false
    end
  end

  def read
    Repository::Read.new(@deck).execute
  end

  def update(params)
    # Update database
    updatable_params = params.select do |k|
      DeckResource.updatable_fields.include? k
    end

    if updatable_params.any?
      return false unless @deck.update updatable_params
    end

    return true unless params[:content]

    # Update repository
    command = Repository::Update.new @deck

    command.content = params[:content]
    command.author = params[:author]
    command.message = params[:message] if params[:message]

    command.execute

    # Generate notification
    Notification.create :user => params[:author],
                        :deck => @deck,
                        :event_type => :deck_updated

    true
  end

  def delete
    # Delete repository
    Repository::Delete.new(@deck).execute

    # Delete database
    @deck.destroy
  end

  def import(repository)
    if @deck.save
      command = Repository::Import.new @deck

      command.repository = repository

      command.execute

      Notification.create :user => @deck.owner,
                          :deck => @deck,
                          :event_type => :deck_created

      true
    else
      false
    end
  rescue => e
    delete
    raise e
  end
end
