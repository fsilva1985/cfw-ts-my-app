import { Router } from 'worktop';

export class UserHandler {
  constructor(router: Router) {
    router.add('GET', '/users', this.getUsers);
  }

  public getUsers = (req:any, res:any) => {
    res.end('OK');
  };
}

export const init = (router: Router) => {
  return new UserHandler(router);
}

export default init;
