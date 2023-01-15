import { Router } from 'worktop'

import UserHandler from './handler/user'

const init = (): Router => {
  const router = new Router()

  router.add('GET', '/alive', (req, res) => {
    res.end('OK')
  })

  UserHandler(router)

  return router
}

export default { init }