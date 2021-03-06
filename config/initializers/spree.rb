# encoding: utf-8
# Configure Spree Preferences
#
# Note: Initializing preferences available within the Admin will overwrite any changes that were made through the user interface when you restart.
#       If you would like users to be able to update a setting with the Admin it should NOT be set here.
#
# In order to initialize a setting do:
# config.setting_name = 'new value'
Spree.config do |config|
  # Example:
  # Uncomment to override the default site name.
  config.site_name = "OnOff"
  config.currency = 'VND'
  config.display_currency = false
  config.currency_symbol_position = 'after'
  config.default_country_id = 219
  config.hide_cents = true
  config.checkout_zone = 'Asia'
  config.address_requires_state = false
  config.auto_capture = true
  config.track_inventory_levels = false
  config.allow_guest_checkout = false
end

I18n.locale = :vi

Spree.user_class = "Spree::User"
