class BungieController < ApplicationController
  skip_before_action :verify_authenticity_token

  def equip
    item_array = params[:items].map { |item| item[:instance].to_s }
    request = Typhoeus::Request.new("https://www.bungie.net/Platform/Destiny2/Actions/Items/EquipItems/",
                                    method: :post,
                                    headers: { "Content-Type" => "application/json",
                                               "Accept" => "application/json",
                                               "x-api-key" => Rails.application.credentials.dig(:bungie, :x_api_key),
                                               "Authorization" => "Bearer " + session[:access_token] },
                                    body: JSON.generate({ characterId: params[:character], itemIds: item_array, membershipType: 2 }))

    request.run
    response = request.response
    response_code = response.code
    response_body = response.body
    render json: response.body
  end

  private

  def bungie_params
    params.permit(:character, :items)
  end
end
