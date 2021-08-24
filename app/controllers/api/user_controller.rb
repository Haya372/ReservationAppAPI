class Api::UserController < ApplicationController
  include JwtAuth
  before_action :jwt_authenticate, except: :create

  def create
    params.permit
    p params[:user]
    user = User.create(user_params)
    token = encode(user.id, user.name)
    response.headers['X-Authentication-Token'] = token
    render json: user
  end

  def user_params
    params.permit(:name, :email, :kana, :password)
  end

  def index
    render json: @curret_user
  end

  def show
    # アクセスを簡単に許していいのかは要検討
    render json: User.find(params[:id])
  end

end
