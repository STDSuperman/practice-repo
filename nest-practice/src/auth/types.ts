export interface AuthPayload {
  username: string;
  password: string;
}
export interface LoginInfo {
  access_token: string;
  userId: string | number;
}

export interface Profile {
  username: string;
  avatar: string;
}
