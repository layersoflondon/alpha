class MapsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:search, :create]

  def index
    @pins        = Pin.all.limit(4).group_by(&:coords)
    @overlays    = Overlay.all.limit(4)
    @collections = Collection.all.limit(4)
  end

  def search
    query        = search_params[:search_query].present? ? search_params[:search_query] : ""

    @pins        = Pin.where("title LIKE '%#{query}%'").limit(10)
    @overlays    = Overlay.where("title LIKE '%#{query}%'").limit(10)
    @collections = Collection.where("name LIKE '%#{query}%'").limit(10)

    if params[:search][:date_from].present?
      date_from = Date.parse("01-01-#{params[:search][:date_from]}")
      @pins     = @pins.where("date_from >= ?", date_from)
      @overlays = @overlays.where("date_from >= ?", date_from)
    end

    if params[:search][:date_to].present?
      date_to = Date.parse("31-12-#{params[:search][:date_to]}")
      @pins     = @pins.where("date_to <= ? OR date_to IS NULL", date_to)
      @overlays = @overlays.where("date_to >= ? OR date_to IS NULL", date_from)
    end

    @pins = @pins.group_by(&:coords)
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

      options = {disposition: :attachment}

      options[:filename] = "#{@content_entry.file_name}" if @content_entry.file_name.present?

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
