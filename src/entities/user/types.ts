export interface AuthTokens {
  access_token: string;
  refresh_token: string;
  access_expired_at: number;
  refresh_expired_at: number;
}
export interface LoginPayload {
  email: string;
  password: string;
}