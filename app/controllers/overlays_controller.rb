class OverlaysController < ApplicationController
  def flag
    Rails.logger.debug("***** flagged overlay #{params[:id]}")
  end
end
