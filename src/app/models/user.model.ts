import { MoveModel } from './move.model';

export interface User {
  _id?: string;
  username: string;
  password: string;
  name: string;
  coins: number;
  moves: MoveModel[];
}
