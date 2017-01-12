class ApplicationMailer < ActionMailer::Base
  default from: "noreply@layersoflondon.org", to: "moderation@layersoflondon.org"
  layout 'mailer'
end
