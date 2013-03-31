class AddDiscountParametersToSpreePrices < ActiveRecord::Migration
  def change
    add_column :spree_prices, :discount_type, :integer, default: 0
    add_column :spree_prices, :discount_amount, :integer, default: 0
    add_column :spree_prices, :enable_discount, :boolean, default: false
  end
end
