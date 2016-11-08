class MapsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:search]

  def index
    @pins        = Pin.all.limit(4).group_by(&:coords)
    @overlays    = Overlay.all.limit(4)
    @collections = Collection.all.limit(4)
  end

  def search
    Rails.logger.info(search_params.awesome_inspect)
    Rails.logger.info("\n\n")
    query        = search_params[:search_query].present? ? search_params[:search_query] : ""

    @pins        = Pin.where("title LIKE '%#{query}%'").limit(10).group_by(&:coords)
    @overlays    = Overlay.where("title LIKE '%#{query}%'").limit(10)
    @collections = Collection.where("name LIKE '%#{query}%'").limit(10)
  end

  def show
    @pin = Pin.find(params[:id])
  end

  def create
    Rails.logger.info(pin_params.awesome_inspect)

    @pin = Pin.create!(pin_params)
  end

  private
  def search_params
    params.require(:search).permit!
  end
end
