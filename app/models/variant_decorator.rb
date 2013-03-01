Spree::Variant.class_eval do
  accepts_nested_attributes_for :images, :allow_destroy => true
	accepts_nested_attributes_for :option_values, :allow_destroy => true
	attr_accessible :images, :images_attributes, :count_on_hand, :is_master
end
