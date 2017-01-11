class PostDecorator < Draper::Decorator
  delegate_all

  # Define presentation-specific methods here. Helpers are accessed through
  # `helpers` (aka `h`). You can override attributes, for example:
  #
  #   def created_at
  #     helpers.content_tag :span, class: 'time' do
  #       object.created_at.strftime("%a %m/%d/%y")
  #     end
  #   end

  def excerpt
    object.fields.excerpt.present? ? fields.excerpt.html_safe : h.strip_tags(fields.content).truncate(100).html_safe
  end

  def author_name
    if object.respond_to?(:_embedded) && object._embedded[:author].first
      author = object._embedded[:author].first
      author[:name]
    end
  end
end
