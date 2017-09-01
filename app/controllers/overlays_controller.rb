class OverlaysController < ApplicationController
  def flag
    begin
      if GeoreferencedImage.find_by(georeferencer_id: params[:id]).try(:flag!)
        ModerationMailer.georeferenced_overlay_flagged(params[:id]).deliver_later
      end

    ensure


      render json: {status: "OK"}, status: 200
    end

  end
end
