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
    @pin = current_user.try(:pins).try(:build, pin_params) || Pin.new

    authorize @pin

    @pin.save!
  end

  def download
    @content_entry = ContentEntry.find(params[:content_entry_id])

    if @content_entry.attached_file.present?
      authorize @content_entry

      options = {
        disposition: :attachment
      }

      # case 
      options[:filename] = "#{@content_entry.id}.txt" if @content_entry.content_type.name=="text"

      send_file(@content_entry.attached_file.path, options)
    else
      render nothing: true, status: 404
    end
  end

  private
  def pin_params
    params.require(:pin).permit!
  end

  def search_params
    params.require(:search).permit!
  end
end
