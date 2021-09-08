class Api::Admin::OrganizationController < ApplicationController
  include JwtAuth
  before_action :jwt_authenticate

  def index
    organizations = @current_user.organization_with_role;
    render json: organizations
  end
end