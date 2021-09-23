class Api::User::ReservationController < ApplicationController
  include JwtAuth
  before_action :jwt_authenticate

  def index
    render json: {
      "items" => params[:organizationId].blank? ? Reservation.where(user_id: @current_user.id).page(params[:page]).per(params[:itemPerPage]).with_organization : Reservation.where(user_id: @current_user.id).page(params[:page]).per(params[:itemPerPage]).with_organization.where('organizations.id = ?', params[:organizationId]),
      "total" => params[:organizationId].blank? ? Reservation.where(user_id: @current_user.id).count : Reservation.where(user_id: @current_user.id).joins(space: :organization).where('organizations.id = ?', params[:organizationId]).count
    }
  end
end