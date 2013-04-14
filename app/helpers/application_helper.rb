module ApplicationHelper
	def link_to_remove(name, f)
    link_to_function(name, "remove_fields(this)", :class => 'remove-image-link')
  end

  def product_image_path(product, version)
    product.cover_image ? product.cover_image.attachment.url(version.to_sym) : "noimage/#{version}.png"
  end
end
