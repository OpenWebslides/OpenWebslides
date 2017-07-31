# frozen_string_literal: true

class AssetToken
  attr_accessor :expiration, :subject, :object

  def initialize(subject: nil, object: nil)
    @subject = subject
    @object = object
  end

  def valid?
    # Reload subject to prevent caching
    subject && subject.reload

    return false if expiration.nil? || subject.nil? || object.nil?
    return false if Time.at(expiration).past?

    true
  rescue ActiveRecord::RecordNotFound
    false
  end

  def to_jwt
    payload = {
      :exp => expiration || OpenWebslides.config.api.asset_url_lifetime.hours.from_now.to_i,
      :sub => subject.id,
      :obj => object.id
    }

    JWT.encode payload, Rails.application.secrets.secret_key_base
  end

  def self.from_jwt(token)
    begin
      payload = JWT.decode(token, Rails.application.secrets.secret_key_base).first
    rescue JWT::ExpiredSignature, JWT::DecodeError
      payload = {}
    end

    token = AssetToken.new
    token.expiration = payload['exp']
    token.subject = User.find_by :id => payload['sub'] if payload['sub']
    token.object = Asset.find_by :id => payload['obj'] if payload['obj']

    token
  end
end
