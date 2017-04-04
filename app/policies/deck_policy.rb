# frozen_string_literal: true

class DeckPolicy
  attr_reader :user, :record

  def initialize(user, record)
    @user = user
    @record = record
  end

  def show?
    if @record.public_access?
      # Everyone can read
      true
    elsif @record.protected_access?
      # Authenticated users can read protected deck
      !@user.nil?
    elsif @record.private_access?
      return false if @user.nil?
      # Owner and collaborators users can read private deck
      @record.owner == @user || @record.contributors.include?(@user)
    else
      false
    end
  end

  def create?
    # Authenticated users can create a deck
    !@user.nil?
  end

  def update?
    return false if @user.nil?
    @record.owner == @user || @record.contributors.include?(@user)
  end

  def destroy?
    return false if @user.nil?
    @record.owner == @user
  end

  class Scope
    attr_reader :user, :scope

    def initialize(user, scope)
      @user  = user
      @scope = scope
    end

    def resolve
      if @user
        # Public decks, protected decks and contributions
        collection = scope.where.not(:state => 'private_access') + @user.decks + @user.contributions

        collection.uniq
      else
        # Public decks
        scope
          .where(:state => 'public_access')
      end
    end
  end
end
