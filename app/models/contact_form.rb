class ContactForm < Rooftop::Rails::Extras::ContactForm
  self.fields = {
      name: :text_field,
      email: :text_field,
      message: :text_area
  }
  self.to = "enquiries@layersoflondon.org"
  self.from = "noreply@layersoflondon.org"
  self.setup! #you need to call setup! here because there's no elegant way to call it automatically in the parent class.
end