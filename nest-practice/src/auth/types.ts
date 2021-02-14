export interface AuthPayload{
    username: string;
    password: string;
    userId: string | number;
}

export interface LoginInfo {
    access_token: string;
}