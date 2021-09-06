class Api::User::OrganizationController < ApplicationController
  include JwtAuth
  before_action :jwt_authenticate

  def index
    render json: @current_user.organizations.show_params
  end

  def join_organization
    organization = Organization.find(params[:id])
    raise ForbiddenError if !organization.authenticate(params[:password])
    UserOrganization.create!(user_id: @current_user.id, organization_id: params[:organization_id], role: ["read"])
    render json: @current_user.organizations.show_params
  end

  def destroy
    organization = Organization.find(params[:id])
    @current_user.organizations.delete(organization)
    render json: "success"
  end
end