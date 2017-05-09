# frozen_string_literal: true

require 'fileutils'

namespace :documentation do
  desc 'Generate API documentation'
  task :generate do
    FileUtils.mkdir_p 'doc'
    `yarn run --silent raml2html raml/openwebslides.raml > doc/openwebslides.html`
  end

  desc 'Deploy API documentation to GitHub Pages'
  task :deploy do
    client = Octokit::Client.new :login => ENV['GITHUB_MACHINE_USER'],
                                 :password => ENV['GITHUB_MACHINE_PASSWORD']

    file = Octokit.contents 'openwebslides/openwebslides',
                            :path => 'index.html',
                            :ref => 'gh-pages'

    sha = file.sha

    client.update_contents 'openwebslides/openwebslides',
                           'index.html',
                           'Generate API documentation',
                           sha,
                           :file => 'doc/openwebslides.html',
                           :branch => 'gh-pages'
  end
end
