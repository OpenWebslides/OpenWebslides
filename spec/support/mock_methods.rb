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
mock_command Repository::Asset::Destroy
mock_command Repository::Asset::Find
mock_command Repository::Asset::Update
mock_command Repository::Asset::UpdateFile
mock_command Repository::Asset::Write
