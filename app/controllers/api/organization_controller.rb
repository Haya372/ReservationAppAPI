class Api::OrganizationController < ApplicationController
  include JwtAuth
  before_action :jwt_authenticate
  before_action :check_perm, except: [:index, :create, :show]

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
    users = { users: organization.users.select(:id, :name, :kana) }
    render json: organization.attributes.merge!(users)
  end

  def index
    render json: Organization.search(params[:search])
  end

  def destroy
    Organization.find(params[:id].to_i).destroy
    render json: "success"
  end

  def check_perm
    raise ForbiddenError if !@current_user.has_role?(params[:id], params[:action])
  end

  def organization_params
    params.permit(:name, :password, :image_url, :rule, :public, :description)
  end
end
