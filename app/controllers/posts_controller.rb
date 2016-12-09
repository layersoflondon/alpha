class PostsController < ApplicationController
  layout "templates/blog_detail"
  decorates_assigned :post, :latest_articles, with: PostDecorator
  def show
    @post = Post.find_by(slug: params[:id]).first
    @latest_articles = Post.where(orderby: :modified, order: :desc, per_page: 4, no_filter: [:per_page]).to_a.reject {|a| a.id == @post.id}
  end
end
