# frozen_string_literal: true

class DeckPolicy < ApplicationPolicy
  ##
  # Resource
  #
  def index?
    # Everyone can list decks
    true
  end

  def create?
    return false if @user.nil?

    # Users can create a deck but only for itself
    @record.owner == @user
  end

  def show?
    # Users can show public decks, collaborations and owned decks
    if @record.public_access?
      # Users and guests can show
      true
    elsif @record.protected_access?
      # Users can show protected deck
      !@user.nil?
    elsif @record.private_access?
      return false if @user.nil?
      # Owner and collaborators can read private deck
      @record.owner == @user || @record.collaborators.include?(@user)
    end
  end

  def update?
    return false if @user.nil?

    # Owner and collaborators can update deck
    @record.owner == @user || @record.collaborators.include?(@user)
  end

  def destroy?
    return false if @user.nil?

    # Owner can destroy deck
    @record.owner == @user
  end

  ##
  # Relationship: owner
  #
  def show_owner?
    # Users can only show owner if the deck is showable
    # Authorize the user separately in the controller
    show?
  end

  ##
  # Relationship: collaborators
  #
  def show_collaborators?
    # Users can only show collaborators if the deck is showable
    # Policy scope separately in the controller
    show?
  end

  ##
  # Relationship: notifications
  #
  def show_notifications?
    # Users can only show notifications if the deck is showable
    # Policy scope separately in the controller
    show?
  end

  ##
  # Relationship: assets
  #
  def show_assets?
    # Users can only show assets if the deck is showable
    # Policy scope separately in the controller
    show?
  end

  ##
  # Relationship: conversion
  #
  def show_conversion?
    # Users can only show conversion if the deck is destroyable
    # Authorize the user separately in the controller
    destroy?
  end

  ##
  # Relationship: conversations
  #
  def show_conversations?
    # Users can only show conversations if the deck is showable
    # Policy scope separately in the controller
    show?
  end

  ##
  # Relationships: annotations
  #
  def show_annotations?
    # Users can show annotations relationship if the deck is showable
    # Policy scope the annotations separately in the controller
    show?
  end

  ##
  # Scope
  #
  class Scope < Scope
    def resolve
      if @user
        # Users can see public decks, protected decks and collaborations
        query = 'decks.state != ? OR decks.user_id = ? OR access_grants.user_id = ?'

        scope.joins('LEFT OUTER JOIN grants access_grants ON access_grants.deck_id = decks.id')
             .where(query, Deck.states['private_access'], @user.id, @user.id)
             .distinct
      else
        # Everyone can see public decks
        scope.where('decks.state' => 'public_access')
      end
    end
  end
end
