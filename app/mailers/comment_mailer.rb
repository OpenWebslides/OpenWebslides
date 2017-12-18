# frozen_string_literal: true

class CommentMailer < ApplicationMailer
  def create(comment)
    @comment = comment
    @user = comment.user
    @deck = comment.deck

    mail :to => @comment.conversation.user.email, :subject => I18n.t('openwebslides.mailer.comment.create.subject')
  end
end
