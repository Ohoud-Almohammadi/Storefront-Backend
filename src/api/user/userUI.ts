export interface UserType {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
export interface UserCreated {
  auth: boolean;
  token: string;
}
