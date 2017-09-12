# frozen_string_literal: true

module OpenWebslides
  class NoTemplateError < Error
    def initialize(template)
      super :title => 'Template not found',
            :detail => "The template '#{template}' does not exist"
    end
  end
end
