class PostsController < ApplicationController
  decorates_assigned :post, :latest_articles, with: PostDecorator
  layout "templates/blog_detail"

  def show
    @post = Post.find_by(slug: params[:id], include_embedded_resources: true, no_filter: [:include_embedded_resources]).first
    @latest_articles = Post.where(orderby: :modified, order: :desc, per_page: 4, no_filter: [:per_page]).to_a.reject {|a| a.id == @post.id}
  end
end
