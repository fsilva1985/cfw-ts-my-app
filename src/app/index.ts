import api from 'delivery/api'

import * as Cache from 'worktop/cache';

import { initialize } from "driver/database/planetscale";

const main = async () => {
    initialize()

    Cache.listen(api.init().run)
}

main()