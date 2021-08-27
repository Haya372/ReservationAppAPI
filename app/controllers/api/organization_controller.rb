class Api::OrganizationController < ApplicationController
  include JwtAuth
  before_action :jwt_authenticate
  before_action :check_perm, only: [:destroy, :update]

  def create
    organization = Organization.new(organization_params)
    organization.users << @current_user
    organization.user_roles << UserRole.new(user_id: @current_user.id, role_id: 1)
    raise BadRequestError if !organization.save
    render json: organization
  end

  def update
    organization = Organization.find(params[:id].to_i)
    organization.update(organization_params)
    render json: organization
  end

  def show
    render json: Organization.select(:id, :name).find(params[:id].to_i)
  end

  def index
    render json: Organization.all.select(:id, :name)
  end

  def destroy
    Organization.find(params[:id].to_i).destroy
    render json: "success"
  end

  def check_perm
    # role_id = 1にしているがこれはroleが増えてきたら処理を書き換える
    roles = UserRole.where(user_id: @current_user.id).where(organization_id: params[:id]).where(role_id: 1)
    raise ForbiddenError if roles.blank?
  end

  def organization_params
    params.permit(:name, :password)
  end
end
