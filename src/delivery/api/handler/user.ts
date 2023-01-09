import { Router } from 'worktop';
import db from 'driver/database'

export class UserHandler {
  constructor(router: Router) {
    router.add('GET', '/users', this.getUsers);
  }

  getUsers = async (req: any, res: any) => {
    const results = await db.init().execute('SELECT * FROM user')
    res.end(JSON.stringify(results.rows));
  };
}

export const init = (router: Router) => {
  return new UserHandler(router);
}

export default init;
