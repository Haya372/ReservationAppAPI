class Api::Admin::OrganizationController < ApplicationController
  include JwtAuth
  before_action :jwt_authenticate
  before_action :check_perm, except: [:index, :create, :role]

  def index
    organizations = @current_user.organization_with_role(params[:search]);
    render json: {
      "items" => organizations.page(params[:page]),
      "total" => @current_user.organizations.count
    }
  end

  def create
    ActiveRecord::Base.transaction do
      begin
        @organization = Organization.create(organization_params)
        UserOrganization.create(user_id: @current_user.id, organization_id: @organization.id, role: ["create", "read", "update", "delete"])
      rescue ActiveRecord::RecordInvalid, ActiveRecord::NotNullViolation => e
        logger.debug e
        raise BadRequestError.new("invalid property")
      end
    end
    render json: Organization.show_params.find(@organization.id)
  end

  def update
    organization = Organization.find(params[:id])
    if !params[:password].blank?
      raise UnAuthorizationError if !organization.authenticate(params[:oldPassword])
    end
    begin
      organization.update!(organization_params)
    rescue ActiveRecord::RecordInvalid, ActiveRecord::NotNullViolation => e
      logger.debug e
      raise BadRequestError.new("invalid property")
    end
    render json: Organization.show_params.find(organization.id)
  end

  def show
    organization = Organization.show_params.find(params[:id])
    raise ActiveRecord::RecordNotFound if organization.blank?
    render json: organization
  end

  def destroy
    Organization.find(params[:id]).destroy
    render json: "success"
  end

  def role
    role = UserOrganization.where(user_id: @current_user.id).select(:role).find_by(organization_id: params[:id])
    render json: role.role
  end

  private
  def check_perm
    raise ForbiddenError if !@current_user.has_role?(params[:id], params[:action])
  end

  def organization_params
    params.permit(:name, :password, :description, :rule, :public)
  end
end