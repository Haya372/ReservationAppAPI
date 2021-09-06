class Api::Organization::UserController < ApplicationController
  include JwtAuth
  before_action :jwt_authenticate
  before_action :check_perm

  def index
    raise ForbiddenError if UserOrganization.where(user_id: @current_user.id).where(organization_id: params[:organization_id]).blank?
    keyword = params[:search].blank? ? "%" : params[:search] + "%"
    render json: Organization.search_user(params[:organization_id], params[:search])
  end

  def check_perm
    raise ForbiddenError if !@current_user.has_role?(params[:organization_id], params[:action])
  end
end
