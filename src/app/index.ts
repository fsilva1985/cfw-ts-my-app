import api from 'delivery/api'

import * as Cache from 'worktop/cache';

const main = async () => {
    Cache.listen(api.init().run)
}

main()