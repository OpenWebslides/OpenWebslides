# frozen_string_literal: true

require 'rails_helper'

RSpec.describe CommentService do
  let(:annotation) { create :comment }

  let(:subject) { described_class.new annotation }
end
