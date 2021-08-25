class Api::ReservationController < ApplicationController
  include JwtAuth
  before_action :jwt_authenticate

  def create
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
end
