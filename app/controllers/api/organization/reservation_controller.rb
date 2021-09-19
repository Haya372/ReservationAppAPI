class Api::Organization::ReservationController < ApplicationController
  include JwtAuth
  before_action :jwt_authenticate

  def index
    raise BadRequestError.new("invalid property") if params[:start_time].blank? || params[:end_time].blank?
    raise BadRequestError.new("invalid property") if DateTime.parse(params[:end_time]) - DateTime.parse(params[:start_time]) <= 0
    render json: Reservation.common_part_in_organization(params[:organization_id], params[:start_time], params[:end_time])
  end
end