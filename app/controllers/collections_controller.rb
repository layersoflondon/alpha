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
end
