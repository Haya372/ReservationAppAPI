class Api::UserController < ApplicationController
  include JwtAuth
  before_action :jwt_authenticate, except: :create

  def create
    begin
      user = User.create!(user_params)
      token = encode(user.id, user.name)
      response.headers['X-Authentication-Token'] = token
    rescue ActiveRecord::RecordInvalid, ActiveRecord::NotNullViolation => e
      logger.debug e
      raise BadRequestError
    end
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
    render json: User.select(:id, :name, :kana).find(params[:id])
  end

  def update
    begin
      @current_user.update!(user_params)
    rescue ActiveRecord::RecordInvalid, ActiveRecord::NotNullViolation => e
      logger.debug e
      raise BadRequestError
    end
    render json: @current_user
  end

  def destroy
    p @current_user.id, params[:id]
    raise ForbiddenError.new("権限がありません") if @current_user.id != params[:id].to_i
    @current_user.destroy
    render json: "success"
  end

end
