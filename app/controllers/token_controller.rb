# frozen_string_literal: true
class TokenController < Knock::AuthTokenController
  ##
  # Knock override
  #
  def entity_class
    User
  end
end
