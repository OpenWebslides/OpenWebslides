# Mock IO operations

def mock_command(klass)
  klass.send :define_method,
             :execute,
             -> { true }
end

mock_command Repository::Git::Commit
mock_command Repository::Git::Init

mock_command Repository::Filesystem::Init
mock_command Repository::Filesystem::Read
mock_command Repository::Filesystem::Render
mock_command Repository::Filesystem::Destroy

mock_command Repository::Asset::Copy
mock_command Repository::Asset::Destroy
mock_command Repository::Asset::Find
mock_command Repository::Asset::Update
mock_command Repository::Asset::UpdateFile
mock_command Repository::Asset::Write
