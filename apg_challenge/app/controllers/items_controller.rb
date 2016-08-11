class ItemsController < ApplicationController
  def info
    @items_hash = Item.group(:classificationType).count
  end

  def import
    Item.import(params[:csv])
    redirect_to root_url, notice: 'Files were successfully imported.'
  end
end
