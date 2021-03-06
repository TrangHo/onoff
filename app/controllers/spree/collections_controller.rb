# encoding: utf-8

module Spree
  class CollectionsController < Spree::StoreController
  	helper 'spree/products'

    def index
    	params[:collection_name] = params[:collection_name].try(:gsub, *['-', ' '])
      @featured_products = Spree::Product.featured.sample(2)
      @taxon = Spree::Taxon.find_by_name(params[:collection_name]) || Spree::Taxonomy.find_by_name('collections').taxons.first.children.try(:first)
      @header_color = 'white'
      @has_top_banner = true
    end
  end
end
