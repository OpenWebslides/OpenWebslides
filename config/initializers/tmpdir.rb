# frozen_string_literal: true

unless Rails.env.test?
  class Dir
    def self.tmpdir
      OpenWebslides.config.tmpdir.to_s
    end
  end
end
