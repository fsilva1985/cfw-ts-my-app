import { connect, Connection } from '@planetscale/database'

import env from 'app/environment'

// create the connection to database
const init = ():Connection => {
    return connect({
        url: env.DATABASE_URL
    })
}

export default {init};