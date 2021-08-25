class Api::ReservationsController < ApplicationController
  include JwtAuth
  before_action :jwt_authenticate

  def create
  end

  def show
    render json: Reservation.find(params[:id])
  end

  def index
    render json: Reservation.where(space_id: permitted_space_id)
  end

  def update
  end

  def destory
    Reservation.find(params[:id]).destroy
    render json: "success"
  end

  def reservation_params
    params.permit(:space_id)
  end

  def permitted_space_id
    params.permit(:space_id)
  end
end
