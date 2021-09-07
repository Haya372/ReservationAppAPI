class Api::Organization::Space::ReservationController < ApplicationController
  include JwtAuth
  before_action :jwt_authenticate

  def create
    ActiveRecord::Base.transaction do
      raise ForbiddenError if !@current_user.belong_organization(params[:organization_id])
      begin
        @reservation = Reservation.create(reservation_params)
        ReservationCount.add(@reservation)
      rescue ActiveRecord::RecordInvalid, ActiveRecord::NotNullViolation => e
        logger.debug e
        raise BadRequestError
      end
    end
    render json: @reservation
  end

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

  def update
    reservation = Reservation.find(params[:id])
    raise ActiveRecord::RecordNotFound if reservation.blank?
    raise ForbiddenError if reservation.user_id != @current_user.id
    ActiveRecord::Base.transaction do
      begin
        reservation.update!(reservation_update_params)
      rescue ActiveRecord::RecordInvalid, ActiveRecord::NotNullViolation => e
        logger.debug e
        raise BadRequestError
      end
    end
    # 参加する人の情報もいい感じに変更できたらいいかも
    # データの渡し方をどうしたら良いか要検討
    render json: reservation
  end

  def destroy
    ActiveRecord::Base.transaction do
      reservation = Reservation.find(params[:id])
      ReservationCount.remove(reservation)
      reservation.destroy
    end
    render json: "success"
  end

  def reservation_params
    { space_id: params[:space_id], numbers: params[:numbers], start_time: params[:start_time], end_time: params[:end_time], user_id: @current_user.id, users: params[:users] }
  end

  def reservation_update_params
    params.permit(:numbers, :start_time, :end_time)
  end

  def permitted_space_id
    params.permit(:space_id)
  end
end
