class MapsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:search, :create]

  def index
    @pins        = Pin.all.limit(4).group_by(&:coords)
    @overlays    = Overlay.all.limit(4)
    @collections = Collection.all.limit(4)
  end

  def search
    if (query = search_params[:search_query]) && query.present?
      query_sql = "title LIKE '%#{query}%'"
    else
      query_sql = "true"
    end

    @pins        = Pin.where(query_sql).limit(10)
    @overlays    = Overlay.where(query_sql).limit(10)
    # @collections = Collection.where(query_sql).limit(10)

    filter_date_from = Date.parse("1-1-#{search_params[:date_from]}")
    filter_date_to   = Date.parse("31-1-#{search_params[:date_to]}")

    @pins = @pins.where("date_from >= ?", filter_date_from)
    @pins = @pins.where("(date_from >= ? AND (date_to <= ? OR date_to IS NULL))", filter_date_from, filter_date_to)

    Rails.logger.info("\n\n#{@pins.to_sql}\n\n")

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
