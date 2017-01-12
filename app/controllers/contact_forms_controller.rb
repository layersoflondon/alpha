class ContactFormsController < ApplicationController
  include Rooftop::Rails::Extras::ContactFormHandler
  self.contact_form = ::ContactForm
end