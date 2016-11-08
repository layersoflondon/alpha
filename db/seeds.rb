# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

%w(Image Video Text File).each do |type|
  puts "Creating content type #{type}"
  ContentType.create(name: type)
end

%w(Tile Polygon Data).each do |overlay_type|
  puts "Creating overlay type #{overlay_type}"
  OverlayType.create(name: overlay_type)
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

100.times do |i|
  date_from = Date.today.advance(years: -(rand(20..2000)), months: rand(0..12), days: rand(0..28))
  date_to = date_from.advance(years: rand(20..2000), months: rand(0..12), days: rand(0..28))
  date_to = 19.years.ago if date_to.future?
  p = Pin.create(
    user: User.all.sample,
    title: Faker::Hipster.sentence(3),
    lat: rand(51.450..51.550),
    lng: -(rand(0.110..0.140)),
    date_from: date_from,
    date_to: date_to
  )
  puts "Added pin #{p.title}"

  p.create_pin_content_entry.create_content_entry(content: Faker::Lorem.paragraph(2, false, 4), content_type: ContentType.all.sample)
end

User.all.each do |user|
  rand(0..3).times do |i|
    c = user.collections.create(name: Faker::Commerce.department)
    puts "Adding collection #{c.name} for user #{user.email}"
    c.pins << Pin.all.sample(rand(1..5))
  end
end

UserGroup.all.each do |group|
  rand(0..3).times do |i|
    c = group.collections.create(name: Faker::Company.catch_phrase)
    puts "Adding collection #{c.name} for user group #{group.name}"
    c.pins << Pin.all.sample(rand(1..5))
  end
end

10.times do |i|
  date_from = Date.today.advance(years: -(rand(20..2000)), months: rand(0..12), days: rand(0..28))
  date_to = date_from.advance(years: rand(20..2000), months: rand(0..12), days: rand(0..28))
  date_to = 19.years.ago if date_to.future?

  overlay_type = i.even? ? OverlayType.find_by(name: "Tile") : OverlayType.all.sample

  o = Overlay.create(
    title: Faker::Hipster.sentence(3),
    lat: rand(51.450..51.550),
    lng: -(rand(0.110..0.140)),
    description: Faker::Hipster.sentence(3),
    overlay_type_id: overlay_type.id,
    date_from: date_from,
    date_to: date_to
  )
  puts "Added overlay #{o.title}"

  content_entry = o.create_overlay_content_entry.create_content_entry(content: Faker::Lorem.paragraph(2, false, 4), content_type: ContentType.find_by(name: "Text"))

  if o.overlay_type.name=="Tile"
    puts "\tAdding tileserver url"
    content_entry.update_attribute(:tileserver_url, "http://layersoflondon-tiles.error.agency/morgan/{z}/{x}/{y}.png")
  elsif o.overlay_type.name=="Polygon"
    puts "\tAdding polygon coords"
    content_entry.update_attribute(:data, [[51.509, -0.08], [51.503, -0.06], [51.51, -0.047]])
  else
    puts "\tAdding bounds data"
    content_entry.update_attribute(:data, [[51.54978710250579, 0.0850234985351562], [51.529787102505786, 0.12000234985351561]])
  end
end
