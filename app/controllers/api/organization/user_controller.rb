class Api::Organization::UserController < ApplicationController
  include JwtAuth
  before_action :jwt_authenticate

  def index
    raise ForbiddenError if UserOrganization.where(user_id: @current_user.id).where(organization_id: params[:organization_id]).blank?
    keyword = params[:search].blank? ? "%" : params[:search] + "%"
    render json: Organization.find(params[:organization_id]).users.select(:id, :name, :kana).where('kana like ?', keyword)
                    .or(Organization.find(params[:organization_id]).users.select(:id, :name, :kana).where('name like ?', keyword))
  end
end
