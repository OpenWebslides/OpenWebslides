# frozen_string_literal: true

module OpenWebslides
  class RepoExistsError < JSONAPI::Exceptions::Error
    def errors
      [JSONAPI::Error.new(code: JSONAPI::INTERNAL_SERVER_ERROR,
                          status: :internal_server_error,
                          title: I18n.t('openwebslides.exceptions.repo_exists.detail',
                                        default: 'Repo exists'),
                          detail: I18n.t('openwebslides.exceptions.repo_exists.detail',
                                         default: 'Repository exists'))]
    end
  end
end
