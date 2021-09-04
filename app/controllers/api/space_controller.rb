class Api::SpaceController < ApplicationController
  include JwtAuth
  before_action :jwt_authenticate
  before_action :check_perm, only: [:update, :destroy]

  def show
    space = Space.with_organization.find(params[:id])
    user_organization = UserOrganization.where(user_id: @current_user.id).where(organization_id: space.organization_id)
    raise ActiveRecord::RecordNotFound if user_organization.blank?
    render json: space
  end

  def update
    raise BadRequestError if !@space.update(space_params)
    render json: @space
  end

  def destroy
    @space.destroy
    render json: "success"
  end

  def space_params
    params.permit(:name, :capacity)
  end

  def check_perm
    # role_id = 1にしているがこれはroleが増えてきたら処理を書き換える
    @space = Space.with_organization.find(params[:id])
    roles = UserRole.where(user_id: @current_user.id).where(organization_id: @space.organization_id).where(role_id: 1)
    raise ForbiddenError if roles.blank?
  end

end