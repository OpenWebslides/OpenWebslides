# frozen_string_literal: true
require 'fileutils'

module OpenWebslides
  module Repository
    extend ActiveSupport::Concern

    included do
      ##
      # Callbacks
      #
      before_create :generate_repository_name
      after_create :create_repository
      before_destroy :destroy_repository

      ##
      # Methods
      #
      def generate_repository_name
        # TODO: avoid collisions
        self.repository = "#{owner.email.parameterize}-#{name.parameterize}"
      end

      def create_repository
        # Create local repository
        FileUtils.mkdir_p repo_path

        # Populate repository
        Rugged::Repository.clone_at OpenWebslides::Configuration.repository_seed, repo_path

        # Create remote repository
        OpenWebslides::Provider::Repository.create repository

        # Synchronize remote repository
      end

      def destroy_repository
        # Destroy local repository
        FileUtils.remove_entry_secure repo_path

        # Destroy remote repository
        OpenWebslides::Provider::Repository.destroy repository
      end

      private

      def repo_path
        File.join OpenWebslides::Configuration.repository_path, repository
      end
    end
  end
end
