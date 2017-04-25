# frozen_string_literal: true

namespace :documentation do
  desc 'Generate API documentation'
  task :generate do
    `raml2html raml/openwebslides.raml > doc/openwebslides.html`
  end
end
