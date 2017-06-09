# frozen_string_literal: true

module Repository
  module Local
    ##
    # Render the HTML
    #
    class Render < Command
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

      private

      def repo_path
        File.join OpenWebslides::Configuration.repository_path, @receiver.canonical_name
      end

      def content_file
        File.join repo_path, 'index.html'
      end

      def template_path
        Rails.root.join 'lib', 'assets', @receiver.template
      end
    end
  end
end
