class PinsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:search]

  def index
  end

  def search
  end

  def show
    @pin = Pin.find(params[:id])
  end

  def create
    Rails.logger.info(pin_params.awesome_inspect)

    @pin = Pin.create!(pin_params)
  end

  private
  def pin_params
    params.require(:pin).permit!
  end
end
