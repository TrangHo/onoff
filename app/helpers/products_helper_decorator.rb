Spree::ProductsHelper.class_eval do
	def breadcrumb(name)
  	path = case controller.controller_name
  	when 'products'
  		link_to t('breadcrumb.online_shop'), products_path
  	when 'collections'
  		link_to t('breadcrumb.collections'), default_collections_path
    else
      link_to t('breadcrumb.homepage'), root_path
  	end
    breadcrumb = raw "#{ link_to t('breadcrumb.homepage'), root_path } > #{ path } > #{name}"
  end

  def product_image_path(product, version)
    product.cover_image ? product.cover_image.attachment.url(version.to_sym) : "noimage/#{version}.png"
  end
end
