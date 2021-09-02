class Api::User::ReservationController < ApplicationController
  include JwtAuth
  before_action :jwt_authenticate

  def index
    render json: Reservation.where(user_id: @current_user.id).with_organization
  end
end