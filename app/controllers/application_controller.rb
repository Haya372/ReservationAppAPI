class ApplicationController < ActionController::API
  class UnAuthorizationError < StandardError; end
  class ForbiddenError < StandardError; end
  class BadRequestError < StandardError; end
  rescue_from UnAuthorizationError, with: :handle_un_authorization_err
  rescue_from JwtAuth::TokenExpiredError, with: :handle_token_expired
  rescue_from JWT::DecodeError, with: :handle_un_authorization_err
  rescue_from JWT::VerificationError, with: :handle_un_authorization_err
  rescue_from ForbiddenError, with: :handle_forbidden_error
  rescue_from BadRequestError, with: :handle_badrequest_error
  rescue_from ActiveModel::StrictValidationFailed, with: :handle_badrequest_error
  rescue_from ActiveRecord::RecordNotFound, with: :handle_notfound_error

  def handle_un_authorization_err(e)
    logger.debug e
    render json: "AuthorizationError", status: :unauthorized
  end

  def handle_token_expired(e)
    logger.debug e
    render json: "token expired", status: :unauthorized
  end

  def handle_forbidden_error(e)
    logger.debug e
    render json: "Forbidden", status: :forbidden
  end

  def handle_badrequest_error(e)
    logger.debug e
    render json: "invalid property", status: :bad_request
  end

  def handle_notfound_error(e)
    logger.debug e
    render json: "Not found", status: :not_found
  end
end
