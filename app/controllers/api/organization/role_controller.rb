class Api::Organization::RoleController < ApplicationController
  include JwtAuth
  before_action :jwt_authenticate
  before_action :check_perm, only: [:create, :update, :destroy]

  def create
    user = User.find(params[:user_id])
    raise BadRequestError if user.blank? || user.organizations.find(params[:organization_id]).blank?
    begin
      role = UserRole.new(user_id: user.id, organization_id: params[:organization_id], role_id: 1)
      role.save!
    rescue ActiveRecord::RecordInvalid, ActiveRecord::NotNullViolation
      raise BadRequestError
    end
    render json: "success"
  end

  def update
    # 現在はroleがadminしかないのでここの処理はなし
    raise ActiveRecord::RecordNotFound
  end

  def destroy
    roles = UserRole.where(organization_id: params[:organization_id])
    # 管理者が残り1人なら削除不可
    raise BadRequestError if roles.length == 1
    role = roles.find_by(user_id: params[:user_id])
    raise ActiveRecord::RecordNotFound if role.blank?
    role.destroy
    render json: "success"
  end

  def index
    render json: User.joins(:roles)
                  .select("users.id, users.name, users.kana, roles.role")
                    .where('user_roles.organization_id = ?', params[:organization_id])
  end

  private
  def check_perm
    roles = UserRole.where(user_id: @current_user.id).where(organization_id: params[:organization_id]).where(role_id: 1)
    raise ForbiddenError if roles.blank?
  end
end