# frozen_string_literal: true

class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def bungie
    @user = User.from_omniauth(request.env["omniauth.auth"])

    if @user.persisted?
      @user.remember_me = true

      sign_in_and_redirect @user, :event => :authentication
    else
      session["devise.bungie_data"] = request.env["omniauth.auth"].except('extra')

      redirect_to '/users/sign_up'
    end
  end
end