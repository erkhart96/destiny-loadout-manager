class ApplicationController < ActionController::Base
include ActionController::Cookies

def hello_world
    session[:count] = (session[:count] || 0) + 1
    render json: { token: session[:access_token] }
end

# def session
#     render json: {token: session["access_token"]}
# end

end
