class LoadoutsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    render json: Loadout.all, status: :ok
  end

  def create
    created_loadout = Loadout.create!(name: params[:name])
    params[:items].each do |item|
      item = Item.find_or_create_by!(item_instance: item[:item_instance], item_hash: item[:hash], name: item[:name], item_type: item[:itemType], image: item[:image])
      find_user = User.find_by(uid: params[:uid])
      created_character_loadout = CharacterLoadout.create!(loadout_id: created_loadout[:id], item_id: item[:id], user_id: find_user[:id])
    end
    render json: created_loadout
  end

  def update
    loadout = Loadout.find(params[:id])
    user = CharacterLoadout.find_by(loadout_id: loadout[:id])[:user_id]
    CharacterLoadout.where(loadout_id: loadout[:id]).destroy_all

    params[:items].each do |item|
      item = Item.find_or_create_by!(item_instance: item[:item_instance], item_hash: item[:hash], name: item[:name], item_type: item[:itemType], image: item[:image])
      created_character_loadout = CharacterLoadout.create!(loadout_id: loadout[:id], item_id: item[:id], user_id: user)
    end

    loadout.update(name: params[:name])
    loadout.save
  end

  def destroy
    loadout = Loadout.find(params[:id])
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
