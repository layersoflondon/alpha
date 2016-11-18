class MapsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:search, :create]

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
    # return render json: pin_params
    # Rails.logger.info(pin_params.awesome_inspect)
    # new_pin_params = pin_params
    # new_pin_params[:pin_content_entry_attributes][:content_entry_attributes][:content_type] = ContentType.find_by(name: pin_params[:pin_content_entry_attributes][:content_entry_attributes][:content_type])
    p = Pin.new(pin_params)

    # byebug


    @pin = p.save!
  end

  private
  def pin_params
    params.require(:pin).permit!
  end

  def search_params
    params.require(:search).permit!
  end
end
