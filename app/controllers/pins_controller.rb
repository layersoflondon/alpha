class PinsController < ApplicationController
  def update
    @pin = Pin.find(params[:id])
    @pin.assign_attributes(pin_params)

    if pin_params.keys.length == 1 && pin_params.keys.first.to_s == 'collection_pins_attributes' # someone is trying to append to this pin's groups collection
      collection = Collection.find(pin_params[:collection_pins_attributes].first[:collection_id])
      CollectionPolicy.new(current_user, collection).user_can_add_pin_to_collection? || (raise Pundit::NotAuthorizedError, "You're not authorised to add pins to this collection")
    else # we're editing a pin and only the user that created it should be permitted
      authorize @pin
    end

    if @pin.save
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
