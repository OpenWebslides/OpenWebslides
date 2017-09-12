# frozen_string_literal: true

module OpenWebslides
  class FileMissingError < Error
    def initialize(file_path)
      super :title => 'File does not exist',
            :detail => "The file at '#{file_path}' does not exist"
    end
  end
end
