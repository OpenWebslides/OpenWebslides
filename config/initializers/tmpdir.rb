# frozen_string_literal: true

class Dir
  def self.tmpdir
    OpenWebslides.config.tmpdir.to_s
  end
end
