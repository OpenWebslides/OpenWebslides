# frozen_string_literal: true

module ResponseHelper
  def jsonapi_error_code(response)
    json = JSON.parse response.body

    # Return one code if only one error
    return json['errors'].first['code'] if json['errors'].one?

    # Return array of codes
    json['errors'].map { |e| e['code'] }
  end
end
