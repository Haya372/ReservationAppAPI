class Api::Organization::ReservationCntController < ApplicationController
  include JwtAuth
  before_action :jwt_authenticate
  before_action :check_perm, except: [:index]

  def index
    raise BadRequestError.new("invalid property") if params[:year].blank? || params[:month].blank?
    keyword = params[:year] + '/' + params[:month] + '/'
    render json: Organization.search_reservation_count(params[:organization_id], keyword)
  end

  private
  def check_perm
    raise ForbiddenError if !@current_user.has_role?(params[:organization_id], params[:action])
  end
end