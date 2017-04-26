# frozen_string_literal: true

require 'fileutils'

namespace :documentation do
  desc 'Generate API documentation'
  task :generate do
    FileUtils.mkdir_p 'doc'
    `raml2html -i raml/openwebslides.raml -o doc/openwebslides.html`
  end
end
