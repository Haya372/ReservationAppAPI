class Api::ReservationController < ApplicationController
  include JwtAuth
  before_action :jwt_authenticate

  def create
    raise BadRequestError if DateTime.parse(params[:end_time]) - DateTime.parse(params[:start_time]) <= 0
    ActiveRecord::Base.transaction do
      raise ForbiddenError if !@current_user.belong_organization(params[:organization_id])
      begin
        @reservation = Reservation.create(reservation_params)
        if !params[:users].blank?
          params[:users].each{ |user_id|
            user = User.find(user_id)
            @reservation.users << user if !user.blank?
          }
        end
        raise ForbiddenError.new("予約がいっぱいです。") if !reservable?
      rescue ActiveRecord::RecordInvalid, ActiveRecord::NotNullViolation
        raise BadRequestError
      end
    end
    render json: @reservation
  end

  def show
    render json: Reservation.find(params[:id])
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
      render json: Reservation.where(permitted_space_id)
    end
  end

  def update
    reservation = Reservation.find(params[:id])
    raise ActiveRecord::RecordNotFound if reservation.blank?
    raise ForbiddenError if reservation.user_id != @current_user.id
    ActiveRecord::Base.transaction do
      begin
        reservation.update!(reservation_update_params)
        if !params[:numbers].blank?
          raise ForbiddenError.new("予約がいっぱいです。") if !reservable?
        end
      rescue ActiveRecord::RecordInvalid, ActiveRecord::NotNullViolation
        raise BadRequestError
      end
    end
    # 参加する人の情報もいい感じに変更できたらいいかも
    # データの渡し方をどうしたら良いか要検討
    render json: reservation
  end

  def destroy
    Reservation.find(params[:id]).destroy
    render json: "success"
  end

  def reservation_params
    { space_id: params[:space_id], numbers: params[:numbers], start_time: params[:start_time], end_time: params[:end_time], user_id: @current_user.id }
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
    common <= capacity[:capacity]
  end

end
