class UsersController < ApplicationController

    def index
        render json: User.all, status: :ok
    end

    def destroy
        user = User.find(params[:id])
        user.destroy
        render json: {}, status: :ok
    end
end