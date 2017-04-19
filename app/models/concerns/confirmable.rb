# frozen_string_literal: true

##
# Account confirmation functionality inspired by Devise's Confirmable
#
module Confirmable
  extend ActiveSupport::Concern

  included do
    has_secure_token :confirmation_token
  end

  def confirmed?
    confirmation_token.nil?
  end

  def confirm
    return false if confirmed?

    update :confirmation_token => nil
    true
  end

  module ClassMethods
    def confirm_by_token(token)
      return false unless token

      confirmable = find_by :confirmation_token => token

      return false unless confirmable

      confirmable.confirm
      true
    end
  end
end
