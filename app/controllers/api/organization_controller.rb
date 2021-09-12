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
        raise BadRequestError
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
      raise BadRequestError
    end
    render json: Organization.show_params.find(organization.id)
  end

  def show
    organization = Organization.find(params[:id])
    raise ActiveRecord::RecordNotFound if organization.blank?
    render json: {
      "id" => organization.id,
      "name" => organization.name,
      "users" => organization.users.select(:id, :name, :kana)
    }
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
    params.permit(:name, :password)
  end
end
