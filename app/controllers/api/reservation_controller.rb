class Api::ReservationController < ApplicationController
  include JwtAuth
  before_action :jwt_authenticate
  before_action :check_perm, only: [:update, :destroy]

  def show
    reservation = Reservation.with_organization.find(params[:id])
    raise ActiveRecord::RecordNotFound if !@current_user.belong_organization(reservation.organization_id)
    render json: reservation
  end

  def update
    ActiveRecord::Base.transaction do
      begin
        @reservation.update!(reservation_update_params)
      rescue ActiveRecord::RecordInvalid, ActiveRecord::NotNullViolation => e
        logger.debug e
        raise BadRequestError
      end
    end
    # 参加する人の情報もいい感じに変更できたらいいかも
    # データの渡し方をどうしたら良いか要検討
    render json: @reservation
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
  def reservation_update_params
    params.permit(:numbers, :start_time, :end_time)
  end

  def check_perm
    @reservation = Reservation.with_organization.find(params[:id])
    raise ActiveRecord::RecordNotFound if !@current_user.belong_organization(@reservation.organization_id)
    raise ActiveRecord::ForbiddenError if @reservation.user_id != @current_user.id
  end
end