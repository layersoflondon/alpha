# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

%(Image Video Text File).each do |type|
  ContentType.create(name: type)
end

%(Tile Polygon Data).each do |overlay_type|
  OverlayType.create(name: overlay_type)
end

25.times do |i|
  User.create(email: "user+#{i}@test", password: "password", password_confirmation: "password")

  UserGroup.create(name: Faker::Educator.secondary_school.gsub("Secodary","Secondary"))
end

groups = UserGroup.all
User.each do |user|
  user.groups << groups.sample(2)
end

100.times do |i|
  date_from = Date.today.advance(years: -(rand(20..2000)), months: rand(0..12), days: rand(0..28))
  date_to = date_from.advance(years: rand(20..2000), months: rand(0..12), days: rand(0..28))
  date_to = 19.years.ago if date_to.future?
  p = Pin.create(
    title: Faker::Hipster.sentence(3),
    lat: -(rand(0.246207..0.337809)),
    lng: rand(51.575242..51.591722),
    date_from: date_from,
    date_to: date_to
  )

  p.create_pin_content_entry.create_content_entry(content: Faker::Lorem.paragraph(2, false, 4), content_type: ContentType.find_by(name: "Text"))
end



