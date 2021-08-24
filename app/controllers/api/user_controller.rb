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
    render json: User.all.select(:id, :name, :kana)
  end

  def show
    # アクセスを簡単に許していいのかは要検討
    render json: User.find(params[:id]).select(:id, :name, :kana)
  end

  def update
    user = @current_user.update(user_params)
    render json: user
  end

  def destroy
    p @current_user.id, params[:id]
    raise ForbiddenError.new("権限がありません") if @current_user.id != params[:id].to_i
    @current_user.destroy
    render json: "success"
  end

end
