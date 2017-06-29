class PinsController < ApplicationController
  def update
    @pin = Pin.find(params[:id])
    @pin.assign_attributes(pin_params)

    authorize @pin

    if @pin.save
      Rails.logger.info("\n\n#{@pin.attributes}, #{@pin.collections.awesome_inspect}")
      render json: {status: "Pin saved"}, status: :ok
    else
      render json: {errors: @pin.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def flag
    Rails.logger.debug("****** Flagged pin #{params[:id]}")

    content_entry = ContentEntry.find(params[:id])
    ModerationMailer.content_entry_flagged(content_entry).deliver_later

    render json: {status: "OK"}, status: 200
  end

  private
  def pin_params
    params.require(:pin).permit(collection_pins_attributes: [:id, :collection_id, :pin_id, :_destroy])
  end
end
