# frozen_string_literal: true

module Repository
  module Filesystem
    ##
    # Render the HTML
    #
    class Render < RepoCommand
      attr_accessor :content

      def execute
        raise OpenWebslides::ArgumentError, 'Content not specified' unless @content

        template = ERB.new File.read File.join template_path, 'index.html.erb'

        struct = OpenStruct.new :name => @receiver.name,
                                :description => @receiver.description,
                                :content => @content

        rendered = template.result(struct.instance_eval { binding })

        File.write content_file, rendered
      end
    end
  end
end
