class GeoreferencedImagesController < ApplicationController
  def index
    @georeferenced_images = GeoreferencedImage.published
  end
end
