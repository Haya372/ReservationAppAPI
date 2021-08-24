class ApplicationController < ActionController::API
  class UnAuthorizationError < StandardError; end
  rescue_from UnAuthorizationError, with: :handle_un_authorization_err
  rescue_from JwtAuth::TokenExpiredError, with: :handle_token_expired

  def handle_un_authorization_err
    logger.error("authorization error")
    render json: "AuthorizationError", status: :unauthorized
  end

  def handle_token_expired
    logger.error("token expired")
    render json: "token expired", status: :unauthorized
  end
end
