class Api::SpaceController < ApplicationController
  include JwtAuth
  before_action :jwt_authenticate
  before_action :check_perm, except[:show]

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
    @space = Space.with_organization.find(params[:id])
    raise ForbiddenError if !@current_user.has_role?(@space.organization_id, params[:action])
  end

end