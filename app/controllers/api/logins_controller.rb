class Api::LoginsController < ApplicationController
  include JwtAuth
  before_action :jwt_authenticate, except: :create

  def create
    @current_user = User.find_by(email: params[:email])
    raise UnAuthorizationError.new("メールアドレスまたはパスワードを間違えています。") if @current_user.blank? || !@current_user.authenticate(params[:password])
    token = encode(@current_user.id, @current_user.name)
    response.headers['X-Authentication-Token'] = token
    render json: { "user" => @current_user, "token" => token }
  end

  def show
    render json: "ok"
  end
end
