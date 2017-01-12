class PinsController < ApplicationController
  def flag
    Rails.logger.debug("****** Flagged pin #{params[:id]}")
    render json: {status: "OK"}, status: 200
  end
end
