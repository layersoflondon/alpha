module ApplicationHelper
  def json_menu_for(menu)
    opts = {
        class: 'main-navigation-list',
        current_class: 'is-current'
    }

    menu.items.collect do |item|
      json_menu_item_for(item, opts)
    end
  end

  def json_menu_item_for(item, opts={})
    default_opts = {
        current_class: 'is-current',
        level: 1
    }.merge(opts)

    item_path  = path_for_menu_item(item)
    item_class = path_matches?(item_path) ? default_opts[:current_class] : ""

    {
        className: item_class,
        link: item_path,
        title: item.title.gsub(/&#038;/, "&").html_safe
    }
  end
end
