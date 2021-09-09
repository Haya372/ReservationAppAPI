class Api::Admin::OrganizationController < ApplicationController
  include JwtAuth
  before_action :jwt_authenticate
  before_action :check_perm, except: [:index]

  def index
    organizations = @current_user.organization_with_role(params[:search]);
    render json: organizations
  end

  def user
    organization = Organization.find(params[:id])
    render json: organization.user_with_role(params[:search])
  end

  private
  def check_perm
    raise ForbiddenError if !@current_user.has_role?(params[:id], params[:action])
  end
end