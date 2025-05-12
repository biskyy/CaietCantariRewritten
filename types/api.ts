export interface ApiErrorResponse {
  message: string;
}

export interface ApiSuccessResponse<ReturnData> {
  data: ReturnData | undefined;
  status: number | undefined;
}

export interface DefaultResponse {
  message: string;
}

export interface LoginResponse {
  message: string;
  token: string;
}

export type UserTokenResponse = string;
