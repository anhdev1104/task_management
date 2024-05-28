export interface User {
  _id: number;
  name: string;
  email: string;
  password: string;
  dob?: string;
  address?: string;
  role: string;
}
