class MapsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:search]

  def index
    @pins        = Pin.all.limit(4).group_by(&:coords)
    @overlays    = Overlay.all
    @collections = Collection.all.limit(4)
  end

  def search
    @pins     = Pin.latest
    @overlays = Overlay.all

    if (query = search_params[:search_query]) && query.present?
      query = query.gsub("'", '')

      @pins     = @pins.where("REPLACE(title, \"'\",'') LIKE ?", "%#{query}%")
    end

    filter_date_from = Date.parse("1-1-#{search_params[:date_from]}").beginning_of_year rescue nil
    filter_date_to   = Date.parse("31-1-#{search_params[:date_to]}").at_end_of_year rescue nil

    # FIXME:
    # the date_from/date_to fields are now being used to bind the range of the date_from field only, if the date_to year is the current year.
    # As the date_to field is optional, we dont post it by default when searching UNLESS the user has changed the slider.
    # once the slider has changed, we store the from/to date state attributes, and as we are then passing the date_to value,
    # when we filter here we would be disregarding any pins that dont have a date_to

    @pins = @pins.where("date_from >= ?", filter_date_from) if filter_date_from
    @pins = @pins.where("date_to <= ?", filter_date_to) if filter_date_to && filter_date_to.year!=Date.today.year

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
    else
      @pin.reload
    end
  end

  def create
    @pin = current_user.pins.build(pin_params)

    authorize @pin

    unless @pin.save
      render json: {errors: @pin.errors}, status: :unprocessable_entity
    else
      # fixme: remove this, figure out why the collections association
      # isn't being included in the view for new pins
      @pin.reload
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
    params.require(:pin).permit!.merge({user_id: current_user.try(:id)})
  end

  def search_params
    params.require(:search).permit!
  end
end
