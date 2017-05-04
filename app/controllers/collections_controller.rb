class CollectionsController < ApplicationController
  def index
    collections = Collection.includes(:user_collection, :pins)
    # return collections sorted by whether they're curated by the current user first, then by the number of pins in the collection
    @collections = collections.sort_by{|c| c.user_collection.try(:user_id)==current_user.try(:id) ? 1 : 0}.sort_by{|c| c.pins.count}
  end

  def show
    @collection = Collection.find(params[:id])
    @pins = @collection.pins.group_by(&:coords)
  end

  def search
    collections = Collection.includes(:user_collection, :pins).references(:user_collection).where("collections.name LIKE ? OR collections.description LIKE ?", "%#{params[:query]}%", "%#{params[:query]}%").where("user_collections.user_id = ? OR user_collections.privacy = ?", current_user.try(:id), 1)
    # return collections sorted by whether they're curated by the current user first, then by the number of pins in the collection
    @collections = collections.sort_by{|c| c.user_collection.try(:user_id)==current_user.try(:id) ? 1 : 0}.sort_by{|c| c.pins.count}
  end
end
