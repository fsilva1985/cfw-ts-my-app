import { connect, Connection } from '@planetscale/database'

// create the connection to database
const init = ():Connection => {
    return connect({
        url: DATABASE_CONNECTION
    })
}

export default {init};