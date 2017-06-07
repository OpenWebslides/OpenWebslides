# frozen_string_literal: true

class UpdateRepoCommand < RepoCommand
  attr_accessor :author, :content

  def execute
    write_file
    commit
  end

  def write_file
    template = ERB.new File.read File.join template_path, 'index.html.erb'

    struct = OpenStruct.new :name => @deck.name,
                            :description => @deck.description,
                            :content => @content

    rendered = template.result(struct.instance_eval { binding })

    File.write content_file, rendered

    @deck.touch
  end

  def commit
    repo.commit @author, 'Update slidedeck'
    repo.sync
  end
end
