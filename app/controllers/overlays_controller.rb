class OverlaysController < ApplicationController
  def flag
    Rails.logger.debug("***** flagged overlay #{params[:id]}")

    ModerationMailer.georeferenced_overlay_flagged(params[:id]).deliver_later
    render json: {status: "OK"}, status: 200
  end
end
