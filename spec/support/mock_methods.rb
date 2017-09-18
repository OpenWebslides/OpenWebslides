# frozen_string_literal: true

def mock_method(klass, method, &block)
  klass.send :define_method,
             method,
             block || ->(*_) { true }
end

def mock_command(klass, &block)
  mock_method klass, :execute, &block
end

mock_command Repository::Git::Commit
mock_command Repository::Git::Init

mock_command Repository::Filesystem::Init
mock_command(Repository::Filesystem::Read) { Nokogiri::HTML5 '' }
mock_command Repository::Filesystem::Render
mock_command Repository::Filesystem::Destroy

mock_command Repository::Asset::Copy

##
# Repository::Asset::Create
#

require_relative '../../app/commands/repository/asset/create'

class Repository::Asset::Create
  def execute
    raise 'Filename not specified' unless filename
    raise 'Author not specified' unless author
    raise 'Path not specified' unless path

    raise OpenWebslides::ArgumentError, 'File already exists' if filename == 'exists.png'
  end
end

##
# Repository::Asset::Find
#
require_relative '../../app/commands/repository/asset/find'

class Repository::Asset::Find
  def execute
    raise 'Filename not specified' unless filename

    raise OpenWebslides::FileMissingError, 'File does not exist' if filename == 'missing.png'

    Rails.root.join('spec', 'support', 'asset.png').to_s
  end
end

##
# Repository::Asset::Destroy
#

require_relative '../../app/commands/repository/asset/destroy'

class Repository::Asset::Destroy
  def execute
    raise 'Filename not specified' unless filename
    raise 'Author not specified' unless author

    raise OpenWebslides::FileMissingError, 'File does not exist' if filename == 'missing.png'
  end
end
