class ApplicationController < ActionController::API
  class UnAuthorizationError < StandardError; end
  class ForbiddenError < StandardError; end
  class BadRequestError < StandardError; end
  rescue_from UnAuthorizationError, with: :handle_un_authorization_err
  rescue_from JwtAuth::TokenExpiredError, with: :handle_token_expired
  rescue_from JWT::VerificationError, with: :handle_un_authorization_err
  rescue_from ForbiddenError, with: :handle_forbidden_error
  rescue_from BadRequestError, with: :handle_badrequest_error
  rescue_from ActiveModel::StrictValidationFailed, with: :handle_validation_error

  def handle_un_authorization_err
    logger.error("authorization error")
    render json: "AuthorizationError", status: :unauthorized
  end

  def handle_token_expired
    logger.error("token expired")
    render json: "token expired", status: :unauthorized
  end

  def handle_forbidden_error
    logger.error("forbidden")
    render json: "Forbidden", status: :forbidden
  end

  def handle_badrequest_error
    logger.error('bad request')
    render json: "Bad Request", status: :bad_request
  end

  def handle_validation_error(e)
    logger.debug e
    render json: "Bad Request", status: :bad_request
  end
end
