export interface IUserResponse {
  result: boolean;
  data: {
    _id: string;
    username: string;
    fullName: string;
    profilePic: string;
  };
  message: string;
}
