json.id pin.id
json.title pin.title

json.date_from pin.date_from.strftime("#{pin.date_from.day.ordinalize} %b %-Y")
json.date_to   pin.date_to.strftime("#{pin.date_to.day.ordinalize} %b %-Y") if pin.date_to.present?

json.pinned_on_date pin.created_at.strftime("#{pin.created_at.day.ordinalize} %b %-Y")
json.location pin.location
json.description pin.description

json.editable user_signed_in? && PinPolicy.new(current_user, pin).update?

json.position do
  json.lat pin.lat
  json.lng pin.lng
end
json.link_url pin.link_url if pin.link_url.present?

json.content_entry do
  json.partial! 'maps/content_entry', locals: {content_entry: pin.content_entry}
end

# json.collection do
#   json.partial! 'collections/collection', locals: {collection: pin.collection}
# end if pin.collection.present?

# adding the collections array with this pin's collection as its only member so that when we're editing the note, we can easily render the select
json.collections do
  json.array! pin.collections, partial: 'collections/collection', as: :collection
end if pin.collections.any?
