# frozen_string_literal: true

##
# Allows defining controller actions that accept multipart-encoded upload data
# See `config/initializers/jsonapi_resources.rb`, `config/initializers/mime_types.rb`
#
module BinaryUploadable
  extend ActiveSupport::Concern

  included do
    attr_accessor :uploaded_file, :uploaded_filename
  end

  ##
  # Define upload request parameters
  #
  def before_upload_action
    # Ensure media type is 'application/octet-stream'
    ensure_media_type

    # Copy uploaded file to tempfile
    # TODO: sanitize filenames
    # FIXME: parse headers safely
    raise JSONAPI::Exceptions::BadRequest, 'Invalid filename' unless request.headers['Content-Disposition']
    @uploaded_filename = request.headers['Content-Disposition'].gsub(/.*filename=([^;]*).*/, '\1')[1..-2]

    # Create tempfile with proper extension
    @uploaded_file = Tempfile.new ['', ".#{@uploaded_filename.split('.').last}"]
    @uploaded_file.binmode
    @uploaded_file.write request.body.read
    @uploaded_file.close

    # Set up JSONAPI request handling
    setup_request
  rescue => e
    jsonapi_render_errors :json => e
  end

  def ensure_media_type
    unless request.content_type == JSONAPI::BINARY_UPLOAD_MEDIA_TYPE
      raise JSONAPI::Exceptions::UnsupportedBinaryUploadMediaTypeError.new request.content_type
    end
  end

  module ClassMethods
    ##
    # Define an upload action
    #
    def upload_action(*method_syms)
      method_syms.each do |method_sym|
        # Skip JSONAPI checking
        skip_before_action :jsonapi_request_handling, :only => method_sym

        before_action :before_upload_action, :only => method_sym
      end
    end
  end
end
