import { Router } from 'worktop';
import  { init as InitDatabase } from "driver/database/planetscale";
import { Connection } from '@planetscale/database'

export class UserHandler {
  private connection: Connection

  constructor(router: Router, connection: Connection) {
    this.connection = connection

    router.add('GET', '/users', this.getUsers);
  }

  getUsers = async (req: any, res: any) => {
    const results = await this.connection.execute('SELECT * FROM user')
    res.end(JSON.stringify(results.rows));
  };
}

export const init = (router: Router) => {
  const connection = InitDatabase();

  return new UserHandler(router, connection);
}

export default init;
