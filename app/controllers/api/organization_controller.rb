class Api::OrganizationController < ApplicationController
  include JwtAuth
  before_action :jwt_authenticate
  before_action :check_perm, only: [:create, :destroy, :update]

  def create
    organization = Organization.new(organization_params)
    organization.users << @current_user
    organization.user_roles << UserRole.new(user_id: @current_user.id, role_id: 1)
    organization.save
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
    # 団体編集権限があるかどうか
    # role APIが完成後に処理を追記
  end

  def organization_params
    params.permit(:name, :password)
  end
end
