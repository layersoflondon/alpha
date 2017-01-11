class MapsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:search]

  def index
    @pins        = Pin.all.limit(4).group_by(&:coords)
    @overlays    = Overlay.all.limit(4)
    @collections = Collection.all.limit(4)
  end

  def search
    @pins     = Pin.limit(10)
    @overlays = Overlay.limit(10)

    if (query = search_params[:search_query]) && query.present?
      query = query.gsub("'", '')

      @pins     = @pins.where("REPLACE(title, \"'\",'') LIKE ?", "%#{query}%")
      @overlays = @overlays.where("REPLACE(title, \"'\",'') LIKE ?", "%#{query}%")
    end

    filter_date_from = Date.parse("1-1-#{search_params[:date_from]}").beginning_of_year rescue nil
    filter_date_to   = Date.parse("31-1-#{search_params[:date_to]}").at_end_of_year rescue nil

    if filter_date_from && filter_date_to
      @pins = @pins.where("date_from >= ?", filter_date_from)
      @pins = @pins.where("(date_from >= ? AND (date_to <= ? OR date_to IS NULL))", filter_date_from, filter_date_to)
    end

    @pins = @pins.group_by(&:coords)
  end

  def show
    @pin = Pin.find(params[:id])
  end

  def update
    @pin = current_user.pins.find(params[:id])

    authorize @pin

    unless @pin.update_attributes(pin_params)
      render json: {errors: @pin.errors}, status: :unprocessable_entity
    end
  end

  def create
    @pin = current_user.try(:pins).try(:build, pin_params) || Pin.new

    authorize @pin

    unless @pin.save
      render json: {errors: @pin.errors}, status: :unprocessable_entity
    end
  end

  def download
    @content_entry = ContentEntry.find(params[:content_entry_id])

    if @content_entry.attached_file.present?
      authorize @content_entry

      options = {disposition: :attachment}

      options[:filename] = "#{@content_entry.file_name}" if @content_entry.file_name.present?

      send_file(@content_entry.attached_file.path, options)
    else
      render nothing: true, status: 404
    end
  end

  def flag_overlay
    Rails.logger.debug("&&&&&&& Overlay id #{params[:id]} was flagged")
  end

  private
  def pin_params
    params.require(:pin).permit!
  end

  def search_params
    params.require(:search).permit!
  end
end
