export interface IUserInfo {
  _id: string;
  username: string;
  fullName: string;
  profilePic: string;
}

export interface IGetUsersResponse {
  result: boolean;
  filteredUsers: IUserInfo[];
  message: string;
}

export interface IUserResponse {
  result: boolean;
  data: IUserInfo;
  message: string;
}

export interface ILogoutResponse {
  result: boolean;
  message: string;
}
