import { IAccount } from './Account';

interface ITeams {
  _id?: string;
  name: string;
  members?: IAccount[];
}

export default ITeams;
