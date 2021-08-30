class Api::SpaceController < ApplicationController
  include JwtAuth
  before_action :jwt_authenticate
  before_action :check_perm, except: [:show, :index]

  def create
    begin
      space = Space.new(space_params)
      space.organizations << Organization.find(permitted_organization_id[:organization_id])
      space.save
    rescue ActiveRecord::NotNullViolation
      raise BadRequestError
    end
    render json: space
  end

  def show
    render json: Space.find(params[:id])
  end

  def index
    render json: Space.belong_organization(permitted_organization_id[:organization_id])
  end

  def update
    space = Space.find(params[:id])
    raise BadRequestError if !space.update(space_params)
    render json: space
  end

  def destroy
    Space.find(params[:id]).destroy
    render json: "success"
  end

  def space_params
    params.permit(:name, :capacity)
  end

  def permitted_organization_id
    params.permit(:organization_id)
  end

  def check_perm
    # role_id = 1にしているがこれはroleが増えてきたら処理を書き換える
    roles = UserRole.where(user_id: @current_user.id).where(permitted_organization_id).where(role_id: 1)
    raise ForbiddenError if roles.blank?
  end
end
