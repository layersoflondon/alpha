class Post
  include Rooftop::Post

  scope :latest, -> {
    where(per_page: 3, page: 1, no_filter: [:page, :per_page])
  }
end
