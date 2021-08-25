class Api::SpaceController < ApplicationController
  include JwtAuth
  before_action :jwt_authenticate


  def create
    space = Space.new(space_params)
    space.organizations << Organization.find(permitted_organization_id[:organization_id])
    space.save
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
    space.update(space_params)
    render json: space
  end

  def destroy
    Space.find(params[:id]).destroy
    render json: "success"
  end

  def check_perm
    # 団体編集権限があるかどうか
    # role APIが完成後に処理を追記
  end

  def space_params
    params.permit(:name, :capacity)
  end

  def permitted_organization_id
    params.permit(:organization_id)
  end
end
