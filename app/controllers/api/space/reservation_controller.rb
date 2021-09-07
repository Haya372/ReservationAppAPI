class Api::Space::ReservationController < ApplicationController
  include JwtAuth
  before_action :jwt_authenticate
  before_action :check_perm, only: [:update, :destroy]

  def create
    space = Space.with_organization.find(params[:space_id])
    ActiveRecord::Base.transaction do
      raise ForbiddenError if !@current_user.belong_organization(space.organization_id)
      begin
        @reservation = Reservation.create(reservation_params)
        end
        raise ForbiddenError.new("予約がいっぱいです。") if !reservable?(space.capacity)
      rescue ActiveRecord::RecordInvalid, ActiveRecord::NotNullViolation => e
        logger.debug e
        raise BadRequestError
      end
    end
    render json: @reservation
  end

  def index
    space = Space.with_organization.find(params[:space_id])
    raise ForbiddenError if !@current_user.belong_organization(space.organization_id)
    if !params[:start_time].blank? && !params[:end_time].blank?
      raise BadRequestError if DateTime.parse(params[:end_time]) - DateTime.parse(params[:start_time]) <= 0
      if params[:sumOnly] && params[:sumOnly].downcase == "true"
        common = Reservation.common_part(params[:space_id], params.permit(:start_time)[:start_time], params.permit(:end_time)[:end_time])
        render json: { "sum" => common.sum(:numbers) }
      else
        render json: Reservation.common_part(params[:space_id], params.permit(:start_time)[:start_time], params.permit(:end_time)[:end_time])
      end
    else
      render json: Reservation.where(space_id: params[:space_id]).with_organization
    end
  end

  def show
    reservation = Reservation.with_organization.find(params[:id])
    raise ActiveRecord::RecordNotFound if !@current_user.belong_organization(reservation.organization_id)
    raise ActiveRecord::RecordNotFound if reservation.space_id != params[:space_id].to_i
    render json: reservation
  end

  def update
    ActiveRecord::Base.transaction do
      begin
        @reservation.update!(reservation_update_params)
        if !params[:numbers].blank?
          #Ex:- :null => false]
          raise ForbiddenError.new("予約がいっぱいです。") if !reservable?
        end
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
    @reservation.destroy
    render json: "success"
  end

  private
  def reservable?(capa = nil)
    capacity = capa ? capa : @reservation.space_capacity
    common = Reservation.common_part(@reservation.space_id, @reservation.start_time, @reservation.end_time).sum(:numbers)
    common <= capacity
  end

  def reservation_params
    { space_id: params[:space_id], numbers: params[:numbers], start_time: params[:start_time], end_time: params[:end_time], user_id: @current_user.id, users: params[:users] }
  end

  def reservation_update_params
    params.permit(:numbers, :start_time, :end_time)
  end

  def check_perm
    @reservation = Reservation.with_organization.find(params[:id])
    raise ActiveRecord::RecordNotFound if !@current_user.belong_organization(@reservation.organization_id)
    raise ActiveRecord::ForbiddenError if @reservation.user_id != @current_user.id
    raise ActiveRecord::RecordNotFound if @reservation.space_id != params[:space_id].to_i
  end
end