module PostCollection
  extend ActiveSupport::Concern

  included do
    before_action :get_posts, only: :show, if: -> {@page.template.present? && @page.template.underscore == "blog_articles"}
    decorates_assigned :post, :posts, with: PostDecorator
  end

  private
  def get_posts
      @per_page = (params[:per_page].to_i > 0) ? params[:per_page].to_i : 10
      @page_number = (params[:page].to_i > 0) ? params[:page].to_i : 1
      posts = Post.where(per_page: @per_page, page: @page_number, no_filter: [:page, :per_page])
      @total_pages = posts.metadata[:pagination][:total_pages]
      @previous_page = (@page_number > 1) ? @page_number - 1 : @page_number
      @next_page = (@page_number == @total_pages) ? @page_number : @page_number + 1
      @posts = posts.sort_by {|a| Date.parse(a.fields.blog_date) rescue Date.today}.reverse
  end
end
