module JwtAuth
  require 'jwt'
  class TokenExpiredError < StandardError; end

  SECRET_KEY = "test"
  EXPIRES_IN = 1.month.from_now.to_i # １ヶ月

  def jwt_authenticate
    raise UnAuthorizationError.new("認証情報が不足しています。") if request.headers['Authorization'].blank?
    encoded_token = request.headers['Authorization'].split('Bearer ').last
    payload = decode(encoded_token)
    @current_user = User.find_by(id: payload["id"], name: payload["name"])# , name: payload[:name])
    raise UnAuthorizationError.new("ユーザーが存在しません") if @current_user.blank?
    @current_user
  end



  def encode(user_id, user_name)
    payload = { id: user_id, name: user_name, timestamp: Time.now, exp: EXPIRES_IN }
    JWT.encode(payload, SECRET_KEY, 'HS256')
  end

  def decode(encoded_token)
    begin
      # decode後は[ payload, header ]の形で返ってくる
      decoded_token = JWT.decode encoded_token, SECRET_KEY, true, { nbf_leeway: EXPIRES_IN, algorithm: 'HS256' }
      decoded_token.first
    rescue JWT::ExpiredSignature
      # expired error
      raise TokenExpiredError.new("トークンが期限切れです。")
    end
  end

end