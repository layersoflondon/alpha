require 'csv'
namespace :georeferencer do
  desc "Import georeferenced images from a CSV file"
  task import: :environment do
    cli = HighLine.new
    path = cli.ask "Path to CSV (relative is ok)"
    csv_contents = File.open(File.expand_path(path)).read
    CSV.parse(csv_contents, headers: true).each do |line|
      begin
        # Assign the georeferencer ref and url
        georeferencer_ref, wmts_url = line.to_h.values[0], line.to_h.values[-1]
        # can't continue without the info from WMTS
        next if wmts_url.nil?
        # Find or create the image
        image = GeoreferencedImage.find_or_initialize_by(georeferencer_ref: georeferencer_ref)
        image.assign_attributes(wmts_url: wmts_url)
        image.save!
      rescue => e
        Rails.logger.warn("Couldn't save GeoreferencedImage #{line[:id]}: #{e}")
        next
      end

    end
  end
end