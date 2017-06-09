# frozen_string_literal: true

require 'fileutils'

namespace :documentation do
  desc 'Generate API documentation'
  task :generate do
    FileUtils.mkdir_p 'doc'
    `cd client && yarn run --silent raml2html ../raml/openwebslides.raml > ../doc/openwebslides.html`
  end

  desc 'Deploy API documentation to GitHub Pages'
  task :deploy do
    abort "Not deploying documentation on branch #{ENV['TRAVIS_BRANCH']}" unless ENV['TRAVIS_BRANCH'] == 'master'
    abort "Not deploying on Ruby version #{ENV['TRAVIS_RUBY_VERSION']}" unless ENV['TRAVIS_RUBY_VERSION'] == '2.4.1'

    client = Octokit::Client.new :login => ENV['GITHUB_MACHINE_USER'],
                                 :password => ENV['GITHUB_MACHINE_PASSWORD']

    file = client.contents 'openwebslides/openwebslides',
                           :path => 'index.html',
                           :ref => 'gh-pages'

    sha = file.sha

    client.update_contents 'openwebslides/openwebslides',
                           'index.html',
                           "Generate API documentation for commit #{`git rev-parse HEAD`}",
                           sha,
                           :file => 'doc/openwebslides.html',
                           :branch => 'gh-pages'
  end
end
