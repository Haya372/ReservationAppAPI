class Api::Admin::SpaceController < ApplicationController
  include JwtAuth
  before_action :jwt_authenticate
  before_action :check_perm

  def create
    ActiveRecord::Base.transaction do
      begin
        @space = Space.create(space_params)
      rescue ActiveRecord::NotNullViolation => e
        logger.debug e
        raise BadRequestError.new("invalid property")
      end
    end
    render json: @space
  end

  def show
    render json: Space.find(params[:id])
  end

  def index
    render json: {
      "items" => Space.where(permitted_organization_id).page(params[:page]),
      "total" => Space.where(permitted_organization_id).count
    }
  end

  def update
    space = Space.find(params[:id])
    raise BadRequestError.new("invalid property") if !space.update(space_params)
    render json: space
  end

  def destroy
    Space.find(params[:id]).destroy
    render json: "success"
  end

  def space_params
    params.permit(:name, :capacity, :organization_id, :rule, :description)
  end

  def permitted_organization_id
    params.permit(:organization_id)
  end

  def check_perm
    raise ForbiddenError if !@current_user.has_role?(params[:organization_id], params[:action])
  end
end
