class CharacterLoadoutsController < ApplicationController
    skip_before_action :verify_authenticity_token
    
    def index
        render json: CharacterLoadout.all, status: :ok
    end

    def destroy
        character_loadout = CharacterLoadout.find(params[:id])
        character_loadout.destroy
        render json: {}, status: :ok
    end
end
