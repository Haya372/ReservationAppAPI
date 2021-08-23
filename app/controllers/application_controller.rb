class ApplicationController < ActionController::API
  class UnAuthorizationError < StandardError; end
  rescue_from UnAuthorizationError, with: :handle_un_authorization_err

  def handle_un_authorization_err
    logger.error("authorization error")
    render json: "AuthorizationError", status: :unauthorized
  end
end
