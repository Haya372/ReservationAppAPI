class Api::LoginsController < ApplicationController
  include JwtAuth
  before_action :jwt_authenticate, except: :create

  def create
    @curret_user = User.find_by(email: params[:email])
    raise UnAuthorizationError.new("メールアドレスまたはパスワードを間違えています。") if @curret_user.blank? || !@curret_user.authenticate(params[:password])
    token = encode(@curret_user.id, @curret_user.name)
    response.headers['X-Authentication-Token'] = token
    render json: @current_user
  end

  def show
    render json: "ok"
  end
end
