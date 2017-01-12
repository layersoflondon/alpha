class OverlaysController < ApplicationController
  def flag
    Rails.logger.debug("***** flagged overlay #{params[:id]}")
    render json: {status: "OK"}, status: 200
  end
end
