class CollectionsController < ApplicationController
  def index
    collections = Collection.includes(:user_collection, :pins)
    # return collections sorted by whether they're curated by the current user first, then by the number of pins in the collection
    @collections = collections.sort_by{|c| c.user_collection.try(:user_id)==current_user.try(:id) ? 1 : 0}.sort_by{|c| c.pins.count}
  end

  def show
    @collection = Collection.includes(pins: [:user, content_entry: [:content_type]]).find(params[:id])
    @pins = @collection.pins.group_by(&:coords)
  end

  def search
    search_term = params[:query].try(:[], :term)
    collections = Collection.includes(:user_collection, pins: [:user, content_entry: [:content_type]]).references(:user_collection).where("collections.name LIKE ? OR collections.description LIKE ?", "%#{search_term}%", "%#{search_term}%")

    if params[:query].has_key?(:public) && params[:query][:public]=="true"
      collections = collections.where("user_collections.privacy = ?", 1)
    else
      collections = collections.where("user_collections.user_id = ? AND user_collections.privacy = ?", current_user.try(:id), 0)
    end

    # return collections sorted by whether they're curated by the current user first, then by the number of pins in the collection
    @collections = collections.sort_by{|c| c.user_collection.try(:user_id)==current_user.try(:id) ? 1 : 0}.sort_by{|c| c.pins.count}
  end

  def create
    # _params = collection_params
    # collections = [current_user.collections, current_user.user_group_collections]
    # if _params.has_key?(:user_group_collection_attributes) # team collection
    #   current_user.user_group_collections.build(_params)
    # elsif _params.has_key?(:user_collection_attributes) # user collection. will be either private or open
    #   current_user.user_collections.build(_params)
    # end
    # new_collections = [current_user.collections, current_user.user_group_collections]


    new_collection_params = collection_params

    if new_collection_params.has_key?(:user_collection_attributes)
      user_collection_params = new_collection_params.delete(:user_collection_attributes)
      @collection  = current_user.collections.new(new_collection_params)
      @collection.user_collection.assign_attributes(user_collection_params)
    else
      user_collection_params = new_collection_params.delete(:user_group_collection_attributes)
      @collection = Collection.new(new_collection_params)
      @collection.build_user_group_collection(user_collection_params)
    end

    respond_to do |format|
      format.html do
        @collection.save && redirect_to(:back)
      end
      format.json do
        if @collection.save
          render json: {message: "Saved", collection: JSON.parse(render_to_string("collections/show", template: false))}, status: :ok
        else
          render json: {message: "Couldn't save collection", errors: @collection.errors.full_messages}, status: :unprocessable_entity
        end
      end
    end
  end

  private
  def collection_params
    _params = params.require(:collection).permit(:name, :description, user_collection_attributes: [:id, :privacy, :_destroy], user_group_collection_attributes: [:id, :user_group_id, :_destroy])

    # if _params.has_key?(:user_group_collection_attributes)
    # elsif _params.has_key?(:user_collection_attributes)
    #   _params[:user_collection_attributes][:user_id] = current_user.id
    # end

    _params
  end
end
