# frozen_string_literal: true

class FetchRepoCommand < RepoCommand
  def execute
    doc = Nokogiri::HTML5 File.read content_file
    doc.at('body').children.to_html.strip
  end
end
