import ITeams from './Teams';

export interface IAccount {
  _id?: string;
  username: string;
  email: string;
  password: string;
  avatar?: string;
  role?: string;
  status?: string;
  team?: ITeams;
}
