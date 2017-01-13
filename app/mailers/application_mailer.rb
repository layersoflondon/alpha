class ApplicationMailer < ActionMailer::Base
  default from: "noreply@layersoflondon.org", to: "ed+layersoflondon@error.agency"
  layout 'mailer'
end
