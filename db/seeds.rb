# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

[
  {name: "image", description: "An image", suitability: :for_pins, mime_type: "image/jpeg,image/jpg,image/png"},
  {name: "video", description: "A video", suitability: :for_pins},
  {name: "audio", description: "Some audio", suitability: :for_pins, mime_type: "audio/mpeg"},
  {name: "text", description: "Just text", suitability: :for_pins, mime_type: "text/plain"},
  {name: "dataset", description: "A dataset", suitability: :for_both, mime_type: "application/*,text/plain,text/csv,text/tab-separated-values"},
  {name: "tileserver", description: "A tokenised tileserver URL", suitability: :for_overlays},
  {name: "polygon", description: "Some polygon JSON", suitability: :for_overlays},
  {name: "georeferencer_tileserver", description: "A georeferencer tileserver, with a token for the entity as well as x/y/z", suitability: :for_overlays}
].each do |type|
  puts "Creating content type #{type}"
  ContentType.create(type)
end

25.times do |i|
  puts "Creating user and group #{i}"
  User.create(email: "user+#{i}@test", password: "password", password_confirmation: "password", first_name: Faker::Name.first_name, last_name: Faker::Name.last_name)

  UserGroup.create(name: Faker::Educator.secondary_school.gsub("Secodary","Secondary"))
end

groups = UserGroup.all
User.all.each do |user|
  puts "Adding groups to users"
  user.user_groups << groups.sample(2)
end

default_user = User.first
date_from = Date.today.advance(years: -(rand(20..2000)), months: rand(0..12), days: rand(0..28))
date_to   = date_from.advance(years: rand(20..2000), months: rand(0..12), days: rand(0..28))
date_to   = 19.years.ago if date_to.future?

p = Pin.create!(
  user: default_user,
  title: "Barking Park",
  lat: 51.544787102505786,
  lng: 0.08600234985351562,
  date_from: date_from,
  date_to:   date_to,
  location: "Barking",
  aasm_state: "accepted"
)
p.create_pin_content_entry!.create_content_entry!(content: "Photo in barking park", content_type: ContentType.for_pins.sample)

p = Pin.create(
  user: default_user,
  title: "Parsloes Park",
  lat: 51.5437522,
  lng: 0.1328339,
  date_from: date_from,
  date_to:   date_to,
  location: "Barking",
  aasm_state: "accepted"
)
puts "Creating pin #{p.title}"
p.create_pin_content_entry!.create_content_entry!(content: Faker::Lorem.paragraph(2, false, 4), content_type: ContentType.for_pins.sample)

p = Pin.create(
  user: default_user,
  title: "The Leys",
  lat: 51.5345465,
  lng: 0.1601853,
  date_from: date_from,
  date_to:   date_to,
  location: "Barking",
  aasm_state: "accepted"
)
puts "Creating pin #{p.title}"
p.create_pin_content_entry!.create_content_entry!(content: Faker::Lorem.paragraph(2, false, 4), content_type: ContentType.for_pins.sample)

p = Pin.create(
  user: default_user,
  title: "Broad Street",
  lat: 51.535044513278166,
  lng: 0.15101909637451172,
  date_from: date_from,
  date_to:   date_to,
  location: "Barking",
  aasm_state: "accepted"
)
p.create_pin_content_entry!.create_content_entry!(content: Faker::Lorem.paragraph(2, false, 4), content_type: ContentType.for_pins.sample)

p = Pin.create(
  user: default_user,
  title: "Goresbrook Park",
  lat: 51.5353284,
  lng: 0.1389512,
  date_from: date_from,
  date_to:   date_to,
  location: "Barking",
  aasm_state: "accepted"
)
p.create_pin_content_entry.create_content_entry!(content: "Goresbrook Park image", content_type: ContentType.for_pins.sample)

p = Pin.create(
  user: default_user,
  title: "Barking FC",
  lat: 51.544787102505786,
  lng: 0.08600234985351562,
  date_from: date_from,
  date_to:   date_to,
  location: "Barking",
  aasm_state: "accepted"
)
p.create_pin_content_entry!.create_content_entry!(content: "Barking FC club badge", content_type: ContentType.for_pins.sample)
p = Pin.create(
  user: default_user,
  title: "Dagenham & Redbridge FC",
  lat: 51.5474112,
  lng: 0.1588148,
  date_from: date_from,
  date_to:   date_to,
  location: "Barking",
  aasm_state: "accepted"
)
p.create_pin_content_entry!.create_content_entry!(content: "Dagenham & Redbridge FC Stadium", content_type: ContentType.for_pins.sample)

# Morgan map overlay
o = Overlay.create(
  title: "Morgan map (1682)",
  lat: rand(51.450..51.550),
  lng: -(rand(0.110..0.140)),
  description: Faker::Hipster.sentence(3),
  date_from: DateTime.parse("1682-01-01")
)
o.create_overlay_content_entry!.create_content_entry!(content: Faker::Lorem.paragraph(2, false, 4), content_type: ContentType.find_by(name: "tileserver"))
o.content_entry.update_attribute(:tileserver_url, "http://layersoflondon-tiles.error.agency/morgan/{z}/{x}/{y}.png")

# google satellie overlay
o = Overlay.create(
  title: "Satellite View",
  lat: rand(51.450..51.550),
  lng: -(rand(0.110..0.140)),
  description: "Google satellite view of London as it is today",
  date_from: DateTime.parse("2015-01-01")
)
o.create_overlay_content_entry!.create_content_entry!(content: "Google satellite view of London as it is today", content_type: ContentType.find_by(name: "tileserver"))
o.content_entry.update_attribute(:tileserver_url, "http://mt0.google.com/vt/lyrs=s&x={x}&y={y}&z={z}")

# Rocque map
o = Overlay.create(
  title: "Rocque Map (1746)",
  lat: 51.50962,
  lng: -0.10897,
  description: "John Rocque's map from 1746",
  date_from: DateTime.parse("1746-01-01")
)
o.create_overlay_content_entry!.create_content_entry!(content: "John Rocque's map of London from 1746", content_type: ContentType.find_by(name: "tileserver"))
o.content_entry.update_attribute(:tileserver_url, "http://layersoflondon-tiles.error.agency/rocque/{z}/{x}/{y}.png")

# Georeferencer example
o = Overlay.create(
  title: "RAF Photos",
  lat: 51.543666143631555,
  lng: 0.12016296386718749,
  description: Faker::Hipster.sentence(3),
  date_from: DateTime.parse('1942-01-01')
)
o.create_overlay_content_entry!.create_content_entry!(content: Faker::Lorem.paragraph(2, false, 4), content_type: ContentType.find_by(name: "georeferencer_tileserver"), metadata: {georeferencer_table_id: Rails.application.secrets.georeferencer_table_id})
o.content_entry.update_attribute(:tileserver_url, "http://georeferencer-0.tileserver.com/5678017802d5d23499ada6924aff9c417da0a58b/map/{entity_id}/polynomial/{z}/{x}/{y}.png")

# Example polygon overlays
o = Overlay.create(
  title: "Dagenham Polygon",
  lat: rand(51.450..51.550),
  lng: -(rand(0.110..0.140)),
  description: Faker::Hipster.sentence(3),
  date_from: date_from,
  date_to: date_to
)
o.create_overlay_content_entry!.create_content_entry!(content: Faker::Lorem.paragraph(2, false, 4), content_type: ContentType.find_by(name: "polygon"))
o.content_entry.update_attribute(:data, [[51.541334, 0.161790], [51.538832, 0.150172], [51.534623, 0.142953], [51.526694, 0.156902], [51.527512, 0.175814]])

o = Overlay.create(
  title: "Barking Park Polygon",
  lat: rand(51.450..51.550),
  lng: -(rand(0.110..0.140)),
  description: Faker::Hipster.sentence(3),
  date_from: date_from,
  date_to: date_to
)
o.create_overlay_content_entry!.create_content_entry!(content: Faker::Lorem.paragraph(2, false, 4), content_type: ContentType.find_by(name: "polygon"))
o.content_entry.update_attribute(:data, [[51.544751, 0.077629], [51.547828, 0.085397], [51.548705, 0.090797], [51.549565, 0.091755], [51.549102, 0.095532], [51.547299, 0.096915], [51.545496, 0.093165], [51.542518, 0.086461], [51.541906, 0.085503], [51.544106, 0.080742], [51.543444, 0.078401]])
