# frozen_string_literal: true

require 'fileutils'

namespace :documentation do
  desc 'Generate API documentation'
  task :generate do
    FileUtils.mkdir_p 'doc'
    `yarn run --silent raml2html raml/openwebslides.raml > doc/openwebslides.html`
  end
end
