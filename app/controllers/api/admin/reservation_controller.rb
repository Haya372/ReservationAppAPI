class Api::Admin::ReservationController < ApplicationController
  include JwtAuth
  before_action :jwt_authenticate
  before_action :check_perm, only: [:create, :update, :destory]

  def create
    ActiveRecord::Base.transaction do
      @reservation = Reservation.new(admin_reservation_params)
      @reservation.user_id = @current_user.id
      @reservation.users = []
      @reservation.admin_flg = true
      @reservation.numbers = Space.find(params[:space_id]).capacity
      @reservation.save!
      ReservationCount.add(@reservation)
    end
    render json: @reservation
  end

  def show
    render json: Reservation.with_organization.find(params[:id])
  end

  def index
    if !params[:start_time].blank? && !params[:end_time].blank?
      raise BadRequestError.new("invalid property") if DateTime.parse(params[:end_time]) - DateTime.parse(params[:start_time]) <= 0
      if params[:sumOnly] && params[:sumOnly].downcase == "true"
        common = Reservation.common_part(permitted_space_id[:space_id], params.permit(:start_time)[:start_time], params.permit(:end_time)[:end_time])
        render json: { "sum" => common.sum(:numbers) }
      else
        render json: Reservation.common_part(permitted_space_id[:space_id], params.permit(:start_time)[:start_time], params.permit(:end_time)[:end_time]).order(id: :asc)
      end
    else
      render json: { 
        "items" => Reservation.where(permitted_space_id).with_organization.page(params[:page]).order(id: :asc),
        "total" => Reservation.where(permitted_space_id).count
      }
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

  def admin_reservation_params
    params.permit(:space_id, :memo, :start_time, :end_time)
  end

  def check_perm
    raise ForbiddenError if !@current_user.has_role?(params[:organization_id], params[:action])
  end
end
