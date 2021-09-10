class Api::Admin::ReservationController < ApplicationController
  include JwtAuth
  before_action :jwt_authenticate

  def show
    render json: Reservation.with_organization.find(params[:id])
  end

  def index
    if !params[:start_time].blank? && !params[:end_time].blank?
      raise BadRequestError if DateTime.parse(params[:end_time]) - DateTime.parse(params[:start_time]) <= 0
      if params[:sumOnly] && params[:sumOnly].downcase == "true"
        common = Reservation.common_part(permitted_space_id[:space_id], params.permit(:start_time)[:start_time], params.permit(:end_time)[:end_time])
        render json: { "sum" => common.sum(:numbers) }
      else
        render json: Reservation.common_part(permitted_space_id[:space_id], params.permit(:start_time)[:start_time], params.permit(:end_time)[:end_time])
      end
    else
      render json: Reservation.where(permitted_space_id).with_organization
    end
  end

  def destroy
    ActiveRecord::Base.transaction do
      reservation = Reservation.find(params[:id])
      ReservationCount.remove(reservation)
      reservation.destroy
    end
    render json: "success"
  end


  private
  def permitted_space_id
    params.permit(:space_id)
  end
end
