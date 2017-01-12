class PinsController < ApplicationController
  def flag
    Rails.logger.debug("****** Flagged pin #{params[:id]}")

    content_entry = ContentEntry.find(params[:id])
    ModerationMailer.content_entry_flagged(content_entry).deliver_later

    render json: {status: "OK"}, status: 200
  end
end
