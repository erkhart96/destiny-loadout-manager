class ItemsController < ApplicationController

    skip_before_action :verify_authenticity_token

def index
    render json: Item.all, status: :ok
end

def destroy
        item  = Item.find(params[:id])
        item.destroy
        render json: {}, status: :ok
end

def show
    item = Item.find(params[:id])
    render json: item, status: :ok
end
end
