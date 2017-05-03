class CollectionsController < ApplicationController
  def index
    @collections = Collection.all
  end

  def search
    @collections = Collection.where("name LIKE ? OR description LIKE ?", "%#{params[:query]}%", "%#{params[:query]}%")
  end
end
