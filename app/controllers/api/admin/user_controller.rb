class Api::Admin::UserController < ApplicationController
  include JwtAuth
  before_action :jwt_authenticate
  before_action :check_perm

  def index
    organization = Organization.find(params[:organization_id])
    render json: organization.user_with_role(params[:search])
  end

  def update
    raise BadRequestError if params[:id].blank?
    user_organization = UserOrganization.where(user_id: params[:id]).find_by(organization_id: params[:organization_id])
    user_organization.update!(role: params[:role])
    render json: User.with_role(params[:id], params[:organization_id])
  end

  def destroy
    user_organization = UserOrganization.where(user_id: params[:id]).find_by(organization_id: params[:organization_id])
    user_organization.destroy
    render status: :no_content
  end

  def show
    render json: User.with_role(params[:id], params[:organization_id])
  end

  private
  def check_perm
    raise ForbiddenError if !@current_user.has_role?(params[:organization_id], params[:action])
  end

  def role_params
    params.permit(:role)
  end
end