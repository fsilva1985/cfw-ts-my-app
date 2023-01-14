import api from 'delivery/api'

import * as Cache from 'worktop/cache'

import { initialize } from "driver/database/planetscale"

const main = () => {
  initialize()

  Cache.listen(api.init().run)
}

main()