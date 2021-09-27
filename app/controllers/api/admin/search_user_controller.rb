class Api::Admin::SearchUserController < ApplicationController
  include JwtAuth
  before_action :jwt_authenticate

  def index
    render json: User.search(params[:search])
  end
end