class LoadoutsController < ApplicationController

    skip_before_action :verify_authenticity_token


    def index
        render json: Loadout.all, status: :ok
    end

    def create
        created_loadout = Loadout.create!(name: params[:name])
        params[:items].each do |item|
            created_item = Item.create!(item_instance: item[:instance], item_hash: item[:hash])
            find_user = User.find_by(uid: params[:uid])
            created_character_loadout = CharacterLoadout.create!(loadout_id: created_loadout[:id], item_id: created_item[:id], user_id: find_user[:id])
        end
        render json: created_loadout
    end

    def destroy
        loadout  = Loadout.find(params[:id])
        loadout.destroy
        render json: {}, status: :ok
    end

    def show
        loadout = Loadout.find(params[:id])
        render json: loadout, status: :ok
    end

    private
    def loadout_params
        params.permit(:name, :uid, :items)
    end
end
