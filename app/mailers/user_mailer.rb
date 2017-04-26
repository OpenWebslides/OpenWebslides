# frozen_string_literal: true

class UserMailer < ActionMailer::Base
  default :from => 'openwebslides@openwebslides'

  def on_create(user)
    return if user.confirmed?

    @user = user
    mail :to => user.email, :subject => 'Welcome to Open Webslides!'
  end

  def on_password_reset(user); end

  def on_password_change(user); end
end
