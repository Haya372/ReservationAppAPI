class Api::Admin::UserController < ApplicationController
  include JwtAuth
  before_action :jwt_authenticate
  before_action :check_perm

  def index
    organization = Organization.find(params[:organization_id])
    render json: {
      "items": organization.user_with_role(params[:search]).order(id: :asc).page(params[:page]),
      "total": organization.users.count
    }
  end

  def update
    raise BadRequestError.new("invalid property") if params[:id].blank?
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

  def create
    raise BadRequestError.new("パラメータが不適切です") if params[:users].blank? || params[:users].class != Array
    params[:users].each{|user_id|
      user_organization = UserOrganization.where(user_id: user_id).where(organization_id: params[:organization_id])
      UserOrganization.create!(user_id: user_id, organization_id: params[:organization_id], role: []) if user_organization.blank?
    }
    render status: :ok
  end

  private
  def check_perm
    raise ForbiddenError if !@current_user.has_role?(params[:organization_id], params[:action])
  end

  def role_params
    params.permit(:role)
  end
end