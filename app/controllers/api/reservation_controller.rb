class Api::ReservationController < ApplicationController
  include JwtAuth
  before_action :jwt_authenticate

  def create
    raise ForbiddenError.new("予約がいっぱいです。") if !reservable?
    reservation = Reservation.new(reservation_params)
    if !params[:users].blank?
      params[:users].each{ |user_id|
        user = User.find(user_id)
        reservation.users << user if !user.blank?
      }
    end
    reservation.save
    render json: reservation
  end

  def show
    render json: Reservation.find(params[:id])
  end

  def index
    render json: Reservation.where(permitted_space_id)
  end

  def update
    if !params[:numbers].blank?
      raise ForbiddenError.new("予約がいっぱいです。") if !reservable?
    end
    reservation = Reservation.find(params[:id])
    reservation.update(reservation_update_params)
    # 参加する人の情報もいい感じに変更できたらいいかも
    # データの渡し方をどうしたら良いか要検討
    render json: reservation
  end

  def destroy
    Reservation.find(params[:id]).destroy
    render json: "success"
  end

  def reservation_params
    params.permit(:space_id, :numbers, :start_time, :end_time)
  end

  def reservation_update_params
    params.permit(:numbers, :start_time, :end_time)
  end

  def permitted_space_id
    params.permit(:space_id)
  end

  private
  def reservable?
    capacity = Space.select(:capacity).find(permitted_space_id[:space_id])
    common = Reservation.common_part(permitted_space_id[:space_id], params.permit(:start_time)[:start_time], params.permit(:end_time)[:end_time]).sum(:numbers)
    common + params[:numbers] <= capacity[:capacity]
  end

end
