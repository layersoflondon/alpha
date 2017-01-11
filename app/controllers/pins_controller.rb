class PinsController < ApplicationController
  def flag
    Rails.logger.debug("****** Flagged pin #{params[:id]}")
  end
end
